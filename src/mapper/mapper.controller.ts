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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mapper')
@Controller('mapper')
export class MapperController {
  constructor(private readonly mapperService: MapperService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Map SES email JSON to a simplified format' })
  @ApiResponse({
    status: 200,
    description: 'The processed email data.',
    type: ProcessedEmailDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  map(@Body() incomingDto: IncomingSesDto): ProcessedEmailDto {
    return this.mapperService.process(incomingDto);
  }
}
