import { Injectable } from '@nestjs/common';
import { SWPersonaEntity } from '../entities/persona.entity';
import { SWAPIRepository } from '../repositories/swapi.repository';

@Injectable()
export class PersonaService {
  constructor(private readonly swAPIRepository: SWAPIRepository) {}

  async getPersonas(): Promise<SWPersonaEntity[]> {
    const peopleArray = await this.swAPIRepository.getPeople();

    return peopleArray.map((v, i) =>
      SWPersonaEntity.fromApiEntity(v, (i + 1).toString()),
    );
  }

  async getPersona(id: string): Promise<SWPersonaEntity> {
    const people = await this.swAPIRepository.getPeopleById(id);

    return SWPersonaEntity.fromApiEntity(people, id);
  }
}
