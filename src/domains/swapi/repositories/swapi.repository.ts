import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FilmEntity } from '../entities/pelicula.entity';
import { PeopleEntity } from '../entities/persona.entity';

const SWAPI_URL = 'https://swapi.dev/api/';

@Injectable()
export class SWAPIRepository {
  async getFilms(): Promise<FilmEntity[]> {
    const response = await axios.get(`${SWAPI_URL}/films`);

    const results: FilmEntity[] = response.data.results;

    return results;
  }

  async getFilmById(id: string): Promise<FilmEntity> {
    const response = await axios.get(`${SWAPI_URL}/films/${id}`);

    const result: FilmEntity = response.data;

    return result;
  }

  async getPeople(): Promise<PeopleEntity[]> {
    const response = await axios.get(`${SWAPI_URL}/people`);

    const results: PeopleEntity[] = response.data.results;

    return results;
  }

  async getPeopleById(id: string): Promise<PeopleEntity> {
    const response = await axios.get(`${SWAPI_URL}/people/${id}`);

    const result: PeopleEntity = response.data;

    return result;
  }
}
