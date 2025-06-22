import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessedEmailDto {
  @ApiProperty({
    description: 'Whether the email was marked as spam.',
    example: true,
  })
  @AutoMap()
  spam: boolean;

  @ApiProperty({
    description: 'Whether the email contained a virus.',
    example: false,
  })
  @AutoMap()
  virus: boolean;

  @ApiProperty({
    description: 'Whether all DNS checks (SPF, DKIM, DMARC) passed.',
    example: true,
  })
  @AutoMap()
  dns: boolean;

  @ApiProperty({
    description: 'The month the email was received.',
    example: 'septiembre',
  })
  @AutoMap()
  mes: string;

  @ApiProperty({
    description: 'Whether the email processing was delayed (>1000ms).',
    example: false,
  })
  @AutoMap()
  retrasado: boolean;

  @ApiProperty({
    description: 'The user part of the sender email address.',
    example: 'sender',
  })
  @AutoMap()
  emisor: string;

  @ApiProperty({
    description: 'The user parts of the recipient email addresses.',
    example: ['recipient'],
  })
  @AutoMap(() => [String])
  receptor: string[];
}
