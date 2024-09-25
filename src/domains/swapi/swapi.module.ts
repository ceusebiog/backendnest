import { Module } from '@nestjs/common';
import { PersonaService } from './services/persona.service';

@Module({
  providers: [PersonaService],
  exports: [PersonaService],
})
export class SwapiModule {}
