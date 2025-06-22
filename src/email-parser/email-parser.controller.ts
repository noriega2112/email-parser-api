import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { ParseEmailDto } from './dto/parse-email.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Email Parser')
@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post('parse')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Parse an email and return the JSON attachment.',
  })
  @ApiBody({ type: ParseEmailDto })
  @ApiResponse({
    status: 201,
    description:
      'Successfully processed the email and returned the JSON attachment.',
    type: Object,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({
    status: 404,
    description: 'JSON attachment not found in the email.',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async parseEmail(@Body() parseEmailDto: ParseEmailDto): Promise<any> {
    return this.emailParserService.parseEmail(parseEmailDto.source);
  }
}
