import { Module } from '@nestjs/common';
import { PersonaService } from './services/persona.service';
import { PeliculaService } from './services/pelicula.service';

@Module({
  providers: [PersonaService, PeliculaService],
  exports: [PersonaService, PeliculaService],
})
export class SwapiModule {}
