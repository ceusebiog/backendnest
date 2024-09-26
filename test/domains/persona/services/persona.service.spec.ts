import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDBRepository } from 'src/domains/persona/repositories/dynamodb.repository';
import { PersonaService } from 'src/domains/persona/services/persona.service';
import { CreatePersonaDto } from 'src/domains/persona/dtos/create-persona.dto';
import { PersonaEntity } from 'src/domains/persona/entities/persona.entity';
import { PersonaMock } from 'test/mocks/persona.mock';

describe('PersonaService', () => {
  let service: PersonaService;
  let repository: DynamoDBRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonaService,
        {
          provide: DynamoDBRepository,
          useValue: {
            save: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PersonaService>(PersonaService);
    repository = module.get<DynamoDBRepository>(DynamoDBRepository);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createPersona', () => {
    it('debe crear y retornar una persona', async () => {
      const createPersonaDto: CreatePersonaDto = PersonaMock;

      jest.spyOn(repository, 'save').mockResolvedValueOnce(undefined);

      const result = await service.createPersona(createPersonaDto);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(createPersonaDto),
      );
      expect(result).toEqual(expect.objectContaining(createPersonaDto));
    });
  });

  describe('getPersonas', () => {
    it('debe retornar un listado de personas', async () => {
      const personaEntity: PersonaEntity[] = [
        {
          id: '123',
          ...PersonaMock,
        },
      ];

      jest.spyOn(repository, 'getAll').mockResolvedValueOnce(personaEntity);

      const result = await service.getPersonas();

      expect(repository.getAll).toHaveBeenCalled();
      expect(result).toEqual(personaEntity);
    });
  });

  describe('getPersonaById', () => {
    it('debe retornar una persona por su id', async () => {
      const id = '123';
      const personaEntity: PersonaEntity = {
        id,
        ...PersonaMock,
      };

      jest.spyOn(repository, 'getById').mockResolvedValueOnce(personaEntity);

      const result = await service.getPersonaById(id);

      expect(repository.getById).toHaveBeenCalledWith(id);
      expect(result).toEqual(personaEntity);
    });
  });
});
