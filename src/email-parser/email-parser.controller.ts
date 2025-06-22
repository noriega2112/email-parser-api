import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { ParseEmailDto } from './dto/parse-email.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';

class FilePathResponse {
  @ApiProperty({
    description: 'The path to the newly created .eml file.',
    example: '/path/to/your/project/processed-1678886400000.eml',
  })
  newFilePath: string;
}

@ApiTags('Email Parser')
@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post('parse')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary:
      'Parse an email, upload its JSON attachment to a pastebin, and return a new email file with the link.',
  })
  @ApiBody({ type: ParseEmailDto })
  @ApiResponse({
    status: 201,
    description:
      'Successfully processed the email and created a new file with the pastebin link.',
    type: FilePathResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 404,
    description: 'JSON attachment not found in the email.',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async parseEmail(
    @Body() parseEmailDto: ParseEmailDto,
  ): Promise<{ newFilePath: string }> {
    return this.emailParserService.parseEmail(parseEmailDto.source);
  }
}
