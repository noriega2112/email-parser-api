import { AutoMap } from '@automapper/classes';

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
  spamVerdict: Verdict;

  @AutoMap(() => Verdict)
  virusVerdict: Verdict;

  @AutoMap(() => Verdict)
  spfVerdict: Verdict;

  @AutoMap(() => Verdict)
  dkimVerdict: Verdict;

  @AutoMap(() => Verdict)
  dmarcVerdict: Verdict;
}

export class Mail {
  @AutoMap()
  timestamp: string;

  @AutoMap()
  source: string;

  @AutoMap(() => [String])
  destination: string[];
}

export class Ses {
  @AutoMap(() => Receipt)
  receipt: Receipt;

  @AutoMap(() => Mail)
  mail: Mail;
}

export class SesRecord {
  @AutoMap(() => Ses)
  ses: Ses;
}

export class IncomingSesDto {
  @AutoMap(() => [SesRecord])
  Records: SesRecord[];
}
