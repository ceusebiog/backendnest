import { Injectable } from '@nestjs/common';
import { SWPeliculaEntity } from '../entities/pelicula.entity';
import { SWAPIRepository } from '../repositories/swapi.repository';

@Injectable()
export class PeliculaService {
  constructor(private readonly swAPIRepository: SWAPIRepository) {}

  async getPeliculas(): Promise<SWPeliculaEntity[]> {
    const filmsArray = await this.swAPIRepository.getFilms();

    return filmsArray.map((v, i) =>
      SWPeliculaEntity.fromApiEntity(v, (i + 1).toString()),
    );
  }

  async getPelicula(id: string): Promise<SWPeliculaEntity> {
    const film = await this.swAPIRepository.getFilmById(id);

    return SWPeliculaEntity.fromApiEntity(film, id);
  }
}
