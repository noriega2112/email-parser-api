import { AutoMap } from '@automapper/classes';

export class ProcessedEmailDto {
  @AutoMap()
  spam: boolean;

  @AutoMap()
  virus: boolean;

  @AutoMap()
  dns: boolean;

  @AutoMap()
  mes: string;

  @AutoMap()
  retrasado: boolean;

  @AutoMap()
  emisor: string;

  @AutoMap(() => [String])
  receptor: string[];
}
