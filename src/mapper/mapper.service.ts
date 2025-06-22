import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { IncomingSesDto, SesRecord } from '@/mapper/dto/incoming-ses.dto';
import { ProcessedEmailDto } from '@/mapper/dto/processed-email.dto';

@Injectable()
export class MapperService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  process(incomingDto: IncomingSesDto): ProcessedEmailDto {
    const sesRecord = incomingDto.Records[0];
    return this.mapper.map(sesRecord, SesRecord, ProcessedEmailDto);
  }
}
