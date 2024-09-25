import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PersonaService } from '../domains/persona/services/persona.service';
import { CreatePersonaDto } from '../domains/persona/dtos/create-persona.dto';
import { PersonaEntity } from '../domains/persona/entities/persona.entity';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  async createPersona(
    @Body() createPersonaDto: CreatePersonaDto,
  ): Promise<PersonaEntity> {
    return this.personaService.createPersona(createPersonaDto);
  }

  @Get()
  async getPersonas(): Promise<PersonaEntity[]> {
    return this.personaService.getPersonas();
  }

  @Get(':id')
  async getPersonaById(@Param('id') id: string): Promise<PersonaEntity> {
    return this.personaService.getPersonaById(id);
  }
}
