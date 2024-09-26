import { Test, TestingModule } from '@nestjs/testing';
import { SWPeliculaEntity } from 'src/domains/swapi/entities/pelicula.entity';
import { SWAPIRepository } from 'src/domains/swapi/repositories/swapi.repository';
import { PeliculaService } from 'src/domains/swapi/services/pelicula.service';
import { FilmMock, SWPeliculaMock } from 'test/mocks/swpelicula.mock';

describe('PeliculaService', () => {
  let service: PeliculaService;
  let repository: SWAPIRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeliculaService,
        {
          provide: SWAPIRepository,
          useValue: {
            getFilms: jest.fn(),
            getFilmById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PeliculaService>(PeliculaService);
    repository = module.get<SWAPIRepository>(SWAPIRepository);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('getPeliculas', () => {
    it('debe retornar un listado de peliculas de Star Wars', async () => {
      const personasArray: SWPeliculaEntity[] = [SWPeliculaMock];

      jest.spyOn(repository, 'getFilms').mockResolvedValueOnce([FilmMock]);

      const result = await service.getPeliculas();

      expect(repository.getFilms).toHaveBeenCalled();
      expect(result).toEqual(personasArray);
    });
  });

  describe('getPeliculaById', () => {
    it('debe retornar una pelicula de Star Wars por su id', async () => {
      const personaEntity: SWPeliculaEntity = SWPeliculaMock;

      jest.spyOn(repository, 'getFilmById').mockResolvedValueOnce(FilmMock);

      const result = await service.getPelicula(personaEntity.id);

      expect(repository.getFilmById).toHaveBeenCalledWith(personaEntity.id);
      expect(result).toEqual(personaEntity);
    });
  });
});
