import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapperModule } from './mapper/mapper.module';

@Module({
  imports: [MapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
