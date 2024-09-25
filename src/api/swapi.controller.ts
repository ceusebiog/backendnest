import { Controller, Get, Param } from '@nestjs/common';
import { PersonaService } from '../domains/swapi/services/persona.service';
import { PersonaEntity } from '../domains/swapi/entities/persona.entity';

@Controller('swapi')
export class SwapiController {
  constructor(private readonly personaService: PersonaService) {}

  @Get('/personas')
  async getPersonas(): Promise<PersonaEntity[]> {
    return this.personaService.getPersonas();
  }

  @Get('/persona/:id')
  async getPersona(@Param('id') id: string): Promise<PersonaEntity> {
    return this.personaService.getPersona(id);
  }
}
