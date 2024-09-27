import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SWPeliculaEntity } from '../entities/pelicula.entity';
import { SWAPIRepository } from '../repositories/swapi.repository';

@Injectable()
export class PeliculaService {
  constructor(private readonly swAPIRepository: SWAPIRepository) {}

  async getPeliculas(): Promise<SWPeliculaEntity[]> {
    try {
      const filmsArray = await this.swAPIRepository.getFilms();

      return filmsArray.map((v, i) =>
        SWPeliculaEntity.fromApiEntity(v, (i + 1).toString()),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo el listado de registros de peliculas',
      );
    }
  }

  async getPelicula(id: string): Promise<SWPeliculaEntity> {
    try {
      const film = await this.swAPIRepository.getFilmById(id);

      if (!film) {
        throw new NotFoundException(`Pelicula con ID ${id} no encontrado`);
      }
      return SWPeliculaEntity.fromApiEntity(film, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error obteniendo el registro de la pelicula con ID ${id}`,
      );
    }
  }
}
