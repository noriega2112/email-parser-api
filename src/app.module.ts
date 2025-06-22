import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapperModule } from './mapper/mapper.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { EmailParserModule } from './email-parser/email-parser.module';

@Module({
  imports: [
    MapperModule,

    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),

    EmailParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
