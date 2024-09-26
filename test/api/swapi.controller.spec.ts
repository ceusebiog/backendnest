import { Test, TestingModule } from '@nestjs/testing';
import { SwapiController } from 'src/api/swapi.controller';
import { SWPeliculaEntity } from 'src/domains/swapi/entities/pelicula.entity';
import { SWPersonaEntity } from 'src/domains/swapi/entities/persona.entity';
import { PeliculaService } from 'src/domains/swapi/services/pelicula.service';
import { PersonaService } from 'src/domains/swapi/services/persona.service';
import { SWPeliculaMock } from 'test/mocks/swpelicula.mock';
import { SWPersonaMock } from 'test/mocks/swpersona.mock';

describe('SWAPIController', () => {
  let controller: SwapiController;
  let personaService: PersonaService;
  let peliculaService: PeliculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwapiController],
      providers: [
        {
          provide: PersonaService,
          useValue: {
            getPersonas: jest.fn(),
            getPersona: jest.fn(),
          },
        },
        {
          provide: PeliculaService,
          useValue: {
            getPeliculas: jest.fn(),
            getPelicula: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SwapiController>(SwapiController);
    personaService = module.get<PersonaService>(PersonaService);
    peliculaService = module.get<PeliculaService>(PeliculaService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /personas', () => {
    it('debe retornar un listado de personas del universo de Star Wars', async () => {
      const personasArray: SWPersonaEntity[] = [SWPersonaMock];

      jest
        .spyOn(personaService, 'getPersonas')
        .mockResolvedValueOnce(personasArray);

      const result = await controller.getPersonas();

      expect(personaService.getPersonas).toHaveBeenCalled();
      expect(result).toEqual(personasArray);
    });
  });

  describe('GET /persona/:id', () => {
    it('debe retornar una persona del universo de Star Wars por su id', async () => {
      const personaEntity: SWPersonaEntity = SWPersonaMock;

      jest
        .spyOn(personaService, 'getPersona')
        .mockResolvedValueOnce(personaEntity);

      const result = await controller.getPersona(SWPersonaMock.id);

      expect(personaService.getPersona).toHaveBeenCalledWith(SWPersonaMock.id);
      expect(result).toEqual(personaEntity);
    });
  });

  describe('GET /peliculas', () => {
    it('debe retornar un listado de peliculas de Star Wars', async () => {
      const peliculasArray: SWPeliculaEntity[] = [SWPeliculaMock];

      jest
        .spyOn(peliculaService, 'getPeliculas')
        .mockResolvedValueOnce(peliculasArray);

      const result = await controller.getPeliculas();

      expect(peliculaService.getPeliculas).toHaveBeenCalled();
      expect(result).toEqual(peliculasArray);
    });
  });

  describe('GET /pelicula/:id', () => {
    it('debe retornar una pelicula de Star Wars por su id', async () => {
      const peliculaEntity: SWPeliculaEntity = SWPeliculaMock;

      jest
        .spyOn(peliculaService, 'getPelicula')
        .mockResolvedValueOnce(peliculaEntity);

      const result = await controller.getPelicula(peliculaEntity.id);

      expect(peliculaService.getPelicula).toHaveBeenCalledWith(
        peliculaEntity.id,
      );
      expect(result).toEqual(peliculaEntity);
    });
  });
});
