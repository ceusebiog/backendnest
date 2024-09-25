import { Module } from '@nestjs/common';
import { SwapiModule } from './domains/swapi/swapi.module';
import { SwapiController } from './api/swapi.controller';

@Module({
  imports: [SwapiModule],
  controllers: [SwapiController],
})
export class AppModule {}