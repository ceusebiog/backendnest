import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PersonaService } from '../domains/persona/services/persona.service';
import { CreatePersonaDto } from '../domains/persona/dtos/create-persona.dto';
import { PersonaEntity } from '../domains/persona/entities/persona.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Personas')
@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @ApiCreatedResponse({
    description: 'El registro de la persona ha sido creado satisfactoriamente',
    type: PersonaEntity,
  })
  @Post()
  async createPersona(
    @Body() createPersonaDto: CreatePersonaDto,
  ): Promise<PersonaEntity> {
    return await this.personaService.createPersona(createPersonaDto);
  }

  @ApiOkResponse({
    description: 'Listado de personas registradas',
    type: [PersonaEntity],
  })
  @Get()
  async getPersonas(): Promise<PersonaEntity[]> {
    return await this.personaService.getPersonas();
  }

  @ApiOkResponse({
    description: 'Detalles de una persona registrada filtrado por su id',
    type: PersonaEntity,
  })
  @ApiNotFoundResponse({
    description: 'No se encontro el registro de la persona',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: 'dada4982-90fc-4b2c-ba3f-29e425c82a1c',
    type: String,
  })
  @Get(':id')
  async getPersonaById(@Param('id') id: string): Promise<PersonaEntity> {
    return await this.personaService.getPersonaById(id);
  }
}
