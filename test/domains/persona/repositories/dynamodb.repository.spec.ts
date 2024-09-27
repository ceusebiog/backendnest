import { mockClient } from 'aws-sdk-client-mock';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBRepository } from 'src/domains/persona/repositories/dynamodb.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonaEntity } from 'src/domains/persona/entities/persona.entity';
import { PersonaMock } from 'test/mocks/persona.mock';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('DynamoDBRepository', () => {
  let repository: DynamoDBRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamoDBRepository],
    }).compile();

    repository = module.get<DynamoDBRepository>(DynamoDBRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('debe guardar una persona en DynamoDB', async () => {
      const personaEntity: PersonaEntity = {
        id: '123',
        ...PersonaMock,
      };

      ddbMock.on(PutCommand).resolves({});

      await repository.save(personaEntity);
    });
  });

  describe('getAll', () => {
    it('debe obtener un listado de personas de DynamoDB', async () => {
      const personasArray: PersonaEntity[] = [
        {
          id: '123',
          ...PersonaMock,
        },
      ];

      const mockResponse = {
        Items: personasArray,
      };

      ddbMock.on(ScanCommand).resolves(mockResponse);

      const result = await repository.getAll();

      expect(result).toEqual(personasArray);
    });
  });

  describe('getById', () => {
    it('debe obtener una persona por id de DynamoDB', async () => {
      const id = '123';
      const personaEntity: PersonaEntity = {
        id,
        ...PersonaMock,
      };

      const mockResponse = {
        Item: personaEntity,
      };

      ddbMock.on(GetCommand).resolves(mockResponse);

      const result = await repository.getById(id);

      expect(result).toEqual(personaEntity);
    });
  });
});
