import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { promises as fs } from 'fs';
import { simpleParser, ParsedMail } from 'mailparser';

@Injectable()
export class EmailParserService {
  async parseEmail(source: string): Promise<any> {
    const emailContent = await this.getEmailContent(source);
    const parsedEmail: ParsedMail = await simpleParser(emailContent);

    const jsonAttachment = parsedEmail?.attachments?.find(
      (att) =>
        att.contentType === 'application/json' ||
        att.filename?.endsWith('.json'),
    );

    if (!jsonAttachment) {
      throw new NotFoundException('No JSON attachment found in the email.');
    }

    const jsonContent = jsonAttachment.content.toString('utf-8');
    const parsedJson = JSON.parse(jsonContent);
    return parsedJson;
  }

  private async getEmailContent(source: string): Promise<Buffer> {
    try {
      if (source.startsWith('http')) {
        const response = await axios.get<Buffer>(source, {
          responseType: 'arraybuffer',
        });
        return Buffer.from(response.data);
      } else {
        return fs.readFile(source);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new InternalServerErrorException(
        `Failed to get email content: ${errorMessage}`,
      );
    }
  }
}
