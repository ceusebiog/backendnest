import { Test, TestingModule } from '@nestjs/testing';
import { SWAPIRepository } from 'src/domains/swapi/repositories/swapi.repository';
import axios from 'axios';
import { PeopleMock } from 'test/mocks/swpersona.mock';
import { PeopleEntity } from 'src/domains/swapi/entities/persona.entity';
import { FilmEntity } from 'src/domains/swapi/entities/pelicula.entity';
import { FilmMock } from 'test/mocks/swpelicula.mock';

jest.mock('axios');

describe('SWAPIRepository', () => {
  let repository: SWAPIRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SWAPIRepository,
        {
          provide: axios,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<SWAPIRepository>(SWAPIRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('debe obtener un listado de peliculas desde el api SWAPI', async () => {
      const filmArray: FilmEntity[] = [FilmMock];

      const mockResponse = {
        data: {
          results: filmArray,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

      const result = await repository.getFilms();

      expect(axios.get).toHaveBeenCalled();
      expect(result).toEqual(filmArray);
    });
  });

  describe('getFilmById', () => {
    it('debe obtener una pelicula por id desde el api SWAPI', async () => {
      const filmEntity: FilmEntity = FilmMock;

      const mockResponse = {
        data: filmEntity,
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

      const result = await repository.getFilmById('1');

      expect(axios.get).toHaveBeenCalled();
      expect(result).toEqual(filmEntity);
    });
  });

  describe('getPeople', () => {
    it('debe obtener un listado de personas desde el api SWAPI', async () => {
      const peopleArray: PeopleEntity[] = [PeopleMock];

      const mockResponse = {
        data: {
          results: peopleArray,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

      const result = await repository.getPeople();

      expect(axios.get).toHaveBeenCalled();
      expect(result).toEqual(peopleArray);
    });
  });

  describe('getPeopleById', () => {
    it('debe obtener una persona por id desde el api SWAPI', async () => {
      const peopleEntity: PeopleEntity = PeopleMock;

      const mockResponse = {
        data: peopleEntity,
      };

      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);

      const result = await repository.getPeopleById('1');

      expect(axios.get).toHaveBeenCalled();
      expect(result).toEqual(peopleEntity);
    });
  });
});
