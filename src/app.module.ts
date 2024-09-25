import { Module } from '@nestjs/common';
import { SwapiModule } from './domains/swapi/swapi.module';
import { SwapiController } from './api/swapi.controller';
import { PersonaModule } from './domains/persona/persona.module';
import { PersonaController } from './api/persona.controller';

@Module({
  imports: [SwapiModule, PersonaModule],
  controllers: [SwapiController, PersonaController],
})
export class AppModule {}
