import { Injectable } from '@nestjs/common';
import { SWPersonaEntity } from '../entities/persona.entity';
import axios from 'axios';

@Injectable()
export class PersonaService {
  private readonly SWAPI_URL = 'https://swapi.dev/api/people/';

  async getPersonas(): Promise<SWPersonaEntity[]> {
    const response = await axios.get(this.SWAPI_URL);
    const results: any[] = response.data.results;

    return results.map((v, i) =>
      SWPersonaEntity.fromApiEntity(v, (i + 1).toString()),
    );
  }

  async getPersona(id: string): Promise<SWPersonaEntity> {
    const response = await axios.get(`${this.SWAPI_URL}${id}`);

    return SWPersonaEntity.fromApiEntity(response.data, id);
  }
}
