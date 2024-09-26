import { Module } from '@nestjs/common';
import { PersonaService } from './services/persona.service';
import { PeliculaService } from './services/pelicula.service';
import { SWAPIRepository } from './repositories/swapi.repository';

@Module({
  providers: [PersonaService, PeliculaService, SWAPIRepository],
  exports: [PersonaService, PeliculaService],
})
export class SwapiModule {}
