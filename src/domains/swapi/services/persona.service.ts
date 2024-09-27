import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SWPersonaEntity } from '../entities/persona.entity';
import { SWAPIRepository } from '../repositories/swapi.repository';

@Injectable()
export class PersonaService {
  constructor(private readonly swAPIRepository: SWAPIRepository) {}

  async getPersonas(): Promise<SWPersonaEntity[]> {
    try {
      const peopleArray = await this.swAPIRepository.getPeople();

      return peopleArray.map((v, i) =>
        SWPersonaEntity.fromApiEntity(v, (i + 1).toString()),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo el listado de registros de personas',
      );
    }
  }

  async getPersona(id: string): Promise<SWPersonaEntity> {
    try {
      const people = await this.swAPIRepository.getPeopleById(id);

      if (!people) {
        throw new NotFoundException(`Persona con ID ${id} no encontrado`);
      }

      return SWPersonaEntity.fromApiEntity(people, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error obteniendo el registro de la persona con ID ${id}`,
      );
    }
  }
}
