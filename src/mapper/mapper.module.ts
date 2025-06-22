import { Module } from '@nestjs/common';
import { MapperController } from './mapper.controller';
import { MapperService } from './mapper.service';
import { MapperProfile } from './mapper.profile';

@Module({
  controllers: [MapperController],
  providers: [MapperService, MapperProfile],
})
export class MapperModule {}
