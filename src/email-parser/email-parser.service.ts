import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';
import { promises as fs } from 'fs';
import { simpleParser, ParsedMail, Attachment } from 'mailparser';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import * as FormData from 'form-data';
import { join, resolve, normalize } from 'path';

@Injectable()
export class EmailParserService {
  async parseEmail(source: string): Promise<{ newFilePath: string }> {
    const emailContent = await this.getEmailContent(source);
    const parsedEmail = (await simpleParser(emailContent)) as ParsedMail;

    const jsonAttachment = parsedEmail?.attachments?.find(
      (att: Attachment) =>
        att.contentType === 'application/json' ||
        att.filename?.endsWith('.json'),
    );

    if (!jsonAttachment) {
      throw new NotFoundException('No JSON attachment found in the email.');
    }

    // Extract and validate JSON content
    let jsonContent: string = '';
    try {
      if (typeof jsonAttachment.content === 'string') {
        jsonContent = jsonAttachment.content;
      } else if (Buffer.isBuffer(jsonAttachment.content)) {
        jsonContent = jsonAttachment.content.toString('utf8');
      } else {
        jsonContent = jsonAttachment.content.toString();
      }

      // Clean the content - remove any BOM or extra whitespace
      jsonContent = jsonContent.trim();

      // Validate that it's actually JSON
      JSON.parse(jsonContent);
    } catch (error) {
      console.error('JSON parsing error:', error);
      console.error('Raw content:', jsonAttachment.content);
      console.error('Extracted content:', jsonContent);
      throw new BadRequestException('Invalid JSON content in attachment');
    }

    const pasteUrl = await this.uploadToPastebin(jsonContent);

    const newEmailBuffer = await this.rebuildEmailWithLink(
      parsedEmail,
      pasteUrl,
      jsonAttachment.filename || 'attachment.json',
    );

    const newFileName = `processed-${Date.now()}.eml`;
    const newFilePath = join(process.cwd(), newFileName);
    await fs.writeFile(newFilePath, newEmailBuffer);

    return { newFilePath };
  }

  private async getEmailContent(source: string): Promise<Buffer> {
    if (source.startsWith('http')) {
      const response = await axios.get(source, {
        responseType: 'arraybuffer',
      });
      return response.data as Buffer;
    } else {
      const normalizedPath = normalize(resolve(source));
      return fs.readFile(normalizedPath);
    }
  }

  private async uploadToPastebin(content: string): Promise<string> {
    try {
      const form = new FormData();
      form.append('content', content);
      const response = await axios.post('https://dpaste.com/api/', form, {
        headers: form.getHeaders(),
      });
      return (response.data as string).trim();
    } catch (error) {
      console.error('Pastebin upload error:', error);
      throw new InternalServerErrorException('Failed to upload to pastebin.');
    }
  }

  private async rebuildEmailWithLink(
    parsedEmail: ParsedMail,
    link: string,
    jsonFilename: string,
  ): Promise<Buffer> {
    const transporter = nodemailer.createTransport({ streamTransport: true });

    const mailOptions: Mail.Options = {
      from: parsedEmail.from?.value,
      to: parsedEmail.to?.value,
      cc: parsedEmail.cc?.value,
      bcc: parsedEmail.bcc?.value,
      subject: parsedEmail.subject,
      text: `Link to JSON content: ${link}\n\n${parsedEmail.text || ''}`,
      html: `<p>Link to JSON content: <a href="${link}">${link}</a></p>${
        parsedEmail.html || ''
      }`,
      attachments:
        parsedEmail.attachments?.filter(
          (att: Attachment) => att.filename !== jsonFilename,
        ) || [],
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Failed to rebuild email.'),
          );
        }
        const stream = info.message as NodeJS.ReadableStream;
        const chunks: Buffer[] = [];
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', (streamErr) =>
          reject(
            new InternalServerErrorException(
              `Failed to read email stream: ${(streamErr as Error).message}`,
            ),
          ),
        );
      });
    });
  }
}
