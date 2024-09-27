import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDBRepository } from 'src/domains/persona/repositories/dynamodb.repository';
import { PersonaService } from 'src/domains/persona/services/persona.service';
import { CreatePersonaDto } from 'src/domains/persona/dtos/create-persona.dto';
import { PersonaEntity } from 'src/domains/persona/entities/persona.entity';
import { PersonaMock } from 'test/mocks/persona.mock';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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

  afterEach(() => {
    jest.clearAllMocks();
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

    it('debe lanzar una excepción InternalServerErrorException si falla el guardado', async () => {
      const personaEntity: PersonaEntity = {
        id: '123',
        ...PersonaMock,
      };

      (repository.save as jest.Mock).mockRejectedValue(
        new Error('DynamoDB save failed'),
      );

      await expect(service.createPersona(personaEntity)).rejects.toThrow(
        InternalServerErrorException,
      );
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

    it('debe lanzar una excepción InternalServerErrorException si ocurre un error inesperado', async () => {
      (repository.getAll as jest.Mock).mockRejectedValue(
        new Error('DynamoDB get failed'),
      );

      await expect(service.getPersonas()).rejects.toThrow(
        InternalServerErrorException,
      );
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

    it('debe lanzar una excepción NotFoundException si el registro de la persona no existe', async () => {
      const id = '123';

      (repository.getById as jest.Mock).mockResolvedValue(null);

      await expect(service.getPersonaById(id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe lanzar una excepción InternalServerErrorException si ocurre un error inesperado', async () => {
      const id = '123';

      (repository.getById as jest.Mock).mockRejectedValue(
        new Error('DynamoDB get failed'),
      );

      await expect(service.getPersonaById(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
