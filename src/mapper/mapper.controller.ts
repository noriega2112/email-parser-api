import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MapperService } from './mapper.service';
import { IncomingSesDto } from './dto/incoming-ses.dto';
import { ProcessedEmailDto } from './dto/processed-email.dto';

@Controller('mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  map(@Body() incomingDto: IncomingSesDto): ProcessedEmailDto {
    return this.mapperService.process(incomingDto);
  }
}
