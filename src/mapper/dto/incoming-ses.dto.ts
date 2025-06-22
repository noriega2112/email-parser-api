import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsObject, ValidateNested } from 'class-validator';

export class Verdict {
  @AutoMap()
  status: string;
}

export class Receipt {
  @AutoMap()
  timestamp: string;

  @AutoMap()
  processingTimeMillis: number;

  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  spamVerdict: Verdict;

  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  virusVerdict: Verdict;

  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  spfVerdict: Verdict;

  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  dkimVerdict: Verdict;

  @AutoMap(() => Verdict)
  @ValidateNested()
  @Type(() => Verdict)
  @IsDefined()
  @IsObject()
  dmarcVerdict: Verdict;
}

export class Mail {
  @AutoMap()
  timestamp: string;

  @AutoMap()
  source: string;

  @AutoMap(() => [String])
  @IsArray()
  destination: string[];
}

export class Ses {
  @AutoMap(() => Receipt)
  @ValidateNested()
  @Type(() => Receipt)
  @IsDefined()
  @IsObject()
  receipt: Receipt;

  @AutoMap(() => Mail)
  @ValidateNested()
  @Type(() => Mail)
  @IsDefined()
  @IsObject()
  mail: Mail;
}

export class SesRecord {
  @AutoMap(() => Ses)
  @ValidateNested()
  @Type(() => Ses)
  @IsDefined()
  @IsObject()
  ses: Ses;
}

export class IncomingSesDto {
  @AutoMap(() => [SesRecord])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SesRecord)
  Records: SesRecord[];
}
