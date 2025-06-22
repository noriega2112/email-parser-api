import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsObject, ValidateNested } from 'class-validator';

export class Verdict {
  @ApiProperty({ example: 'PASS' })
  @AutoMap()
  status: string;
}

export class Receipt {
  @ApiProperty()
  @AutoMap()
  timestamp: string;

  @ApiProperty()
  @AutoMap()
  processingTimeMillis: number;

  @ApiProperty({ type: Verdict })
  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  spamVerdict: Verdict;

  @ApiProperty({ type: Verdict })
  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  virusVerdict: Verdict;

  @ApiProperty({ type: Verdict })
  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  spfVerdict: Verdict;

  @ApiProperty({ type: Verdict })
  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  dkimVerdict: Verdict;

  @ApiProperty({ type: Verdict })
  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  dmarcVerdict: Verdict;
}

export class Mail {
  @ApiProperty()
  @AutoMap()
  timestamp: string;

  @ApiProperty()
  @AutoMap()
  source: string;

  @ApiProperty()
  @AutoMap(() => [String])
  @IsArray()
  destination: string[];
}

export class Ses {
  @ApiProperty({ type: Receipt })
  @AutoMap(() => Receipt)
  @ValidateNested()
  @Type(() => Receipt)
  @IsDefined()
  @IsObject()
  receipt: Receipt;

  @ApiProperty({ type: Mail })
  @AutoMap(() => Mail)
  @ValidateNested()
  @Type(() => Mail)
  @IsDefined()
  @IsObject()
  mail: Mail;
}

export class SesRecord {
  @ApiProperty({ type: Ses })
  @AutoMap(() => Ses)
  @ValidateNested()
  @Type(() => Ses)
  @IsDefined()
  @IsObject()
  ses: Ses;
}

export class IncomingSesDto {
  @ApiProperty({ type: [SesRecord] })
  @AutoMap(() => [SesRecord])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesRecord)
  Records: SesRecord[];
}
