import { Controller, Get, Param } from '@nestjs/common';
import { PersonaService } from '../domains/swapi/services/persona.service';
import { SWPersonaEntity } from '../domains/swapi/entities/persona.entity';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PeliculaService } from 'src/domains/swapi/services/pelicula.service';
import { SWPeliculaEntity } from 'src/domains/swapi/entities/pelicula.entity';

@ApiTags('SWAPI')
@Controller('swapi')
export class SwapiController {
  constructor(
    private readonly personaService: PersonaService,
    private readonly peliculaService: PeliculaService,
  ) {}

  @ApiOkResponse({
    description: 'Listado de personas del universo de StarWars',
    type: [SWPersonaEntity],
  })
  @Get('/personas')
  async getPersonas(): Promise<SWPersonaEntity[]> {
    return this.personaService.getPersonas();
  }

  @ApiOkResponse({
    description:
      'Detalles de una persona del universo de StarWars filtrado por su id',
    type: SWPersonaEntity,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el registro de la persona',
  })
  @ApiParam({ name: 'id', required: true, example: 1, type: Number })
  @Get('/persona/:id')
  async getPersona(@Param('id') id: string): Promise<SWPersonaEntity> {
    return this.personaService.getPersona(id);
  }

  @ApiOkResponse({
    description: 'Listado de peliculas de StarWars',
    type: [SWPeliculaEntity],
  })
  @Get('/peliculas')
  async getPeliculas(): Promise<SWPeliculaEntity[]> {
    return this.peliculaService.getPeliculas();
  }

  @ApiOkResponse({
    description: 'Detalles de una pelicula de StarWars filtrado por su id',
    type: SWPeliculaEntity,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el registro de la pelicula',
  })
  @ApiParam({ name: 'id', required: true, example: 1, type: Number })
  @Get('/pelicula/:id')
  async getPelicula(@Param('id') id: string): Promise<SWPeliculaEntity> {
    return this.peliculaService.getPelicula(id);
  }
}
