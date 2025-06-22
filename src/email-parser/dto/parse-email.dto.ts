import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParseEmailDto {
  @ApiProperty({
    description: 'URL or local file path of the email file (.eml)',
    example: 'https://example.com/email.eml',
  })
  @IsString()
  @IsNotEmpty()
  source: string;
}
