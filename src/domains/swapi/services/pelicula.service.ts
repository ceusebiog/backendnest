import { Injectable } from '@nestjs/common';
import { SWPeliculaEntity } from '../entities/pelicula.entity';
import axios from 'axios';

@Injectable()
export class PeliculaService {
  private readonly SWAPI_URL = 'https://swapi.dev/api/films/';

  async getPeliculas(): Promise<SWPeliculaEntity[]> {
    const response = await axios.get(this.SWAPI_URL);
    const results: any[] = response.data.results;

    return results.map((v, i) =>
      SWPeliculaEntity.fromApiEntity(v, (i + 1).toString()),
    );
  }

  async getPelicula(id: string): Promise<SWPeliculaEntity> {
    const response = await axios.get(`${this.SWAPI_URL}${id}`);

    return SWPeliculaEntity.fromApiEntity(response.data, id);
  }
}
