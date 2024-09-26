import { Test, TestingModule } from '@nestjs/testing';
import { SWPersonaEntity } from 'src/domains/swapi/entities/persona.entity';
import { SWAPIRepository } from 'src/domains/swapi/repositories/swapi.repository';
import { PersonaService } from 'src/domains/swapi/services/persona.service';
import { PeopleMock, SWPersonaMock } from 'test/mocks/swpersona.mock';

describe('PersonaService', () => {
  let service: PersonaService;
  let repository: SWAPIRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonaService,
        {
          provide: SWAPIRepository,
          useValue: {
            getPeople: jest.fn(),
            getPeopleById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PersonaService>(PersonaService);
    repository = module.get<SWAPIRepository>(SWAPIRepository);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('getPersonas', () => {
    it('debe retornar un listado de personas del universo de Star Wars', async () => {
      const personasArray: SWPersonaEntity[] = [SWPersonaMock];

      jest.spyOn(repository, 'getPeople').mockResolvedValueOnce([PeopleMock]);

      const result = await service.getPersonas();

      expect(repository.getPeople).toHaveBeenCalled();
      expect(result).toEqual(personasArray);
    });
  });

  describe('getPersonaById', () => {
    it('debe retornar una persona del universo de Star Wars por su id', async () => {
      const personaEntity: SWPersonaEntity = SWPersonaMock;

      jest.spyOn(repository, 'getPeopleById').mockResolvedValueOnce(PeopleMock);

      const result = await service.getPersona(personaEntity.id);

      expect(repository.getPeopleById).toHaveBeenCalledWith(personaEntity.id);
      expect(result).toEqual(personaEntity);
    });
  });
});
