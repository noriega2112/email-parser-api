import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { SesRecord } from './dto/incoming-ses.dto';
import { ProcessedEmailDto } from './dto/processed-email.dto';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        SesRecord,
        ProcessedEmailDto,
        forMember(
          (destination) => destination.spam,
          mapFrom(
            (source: SesRecord) =>
              source.ses.receipt.spamVerdict.status === 'PASS',
          ),
        ),
        forMember(
          (destination) => destination.virus,
          mapFrom(
            (source: SesRecord) =>
              source.ses.receipt.virusVerdict.status === 'PASS',
          ),
        ),
        forMember(
          (destination) => destination.dns,
          mapFrom(
            (source: SesRecord) =>
              source.ses.receipt.spfVerdict.status === 'PASS' &&
              source.ses.receipt.dkimVerdict.status === 'PASS' &&
              source.ses.receipt.dmarcVerdict.status === 'PASS',
          ),
        ),
        forMember(
          (destination) => destination.mes,
          mapFrom((source: SesRecord) =>
            new Date(source.ses.mail.timestamp).toLocaleString('es-ES', {
              month: 'long',
            }),
          ),
        ),
        forMember(
          (destination) => destination.retrasado,
          mapFrom(
            (source: SesRecord) =>
              source.ses.receipt.processingTimeMillis > 1000,
          ),
        ),
        forMember(
          (destination) => destination.emisor,
          mapFrom((source: SesRecord) => source.ses.mail.source.split('@')[0]),
        ),
        forMember(
          (destination) => destination.receptor,
          mapFrom((source: SesRecord) =>
            source.ses.mail.destination.map((d) => d.split('@')[0]),
          ),
        ),
      );
    };
  }
}
