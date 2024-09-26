import { Controller, Get, Param } from '@nestjs/common';
import { PersonaService } from '../domains/swapi/services/persona.service';
import { SWPersonaEntity } from '../domains/swapi/entities/persona.entity';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('SWAPI')
@Controller('swapi')
export class SwapiController {
  constructor(private readonly personaService: PersonaService) {}

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
}
