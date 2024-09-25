import { Injectable } from '@nestjs/common';
import { PersonaEntity } from '../entities/persona.entity';
import axios from 'axios';

@Injectable()
export class PersonaService {
  private readonly SWAPI_URL = 'https://swapi.dev/api/people/';

  async getPersonas(): Promise<PersonaEntity[]> {
    const response = await axios.get(this.SWAPI_URL);
    const results: any[] = response.data.results

    return results.map((v, i)=> PersonaEntity.fromApiEntity(v, (i + 1).toString()))
  }

  async getPersona(id: string): Promise<PersonaEntity> {
    const response = await axios.get(`${this.SWAPI_URL}${id}`);

    return PersonaEntity.fromApiEntity(response.data, id)
  }
}
