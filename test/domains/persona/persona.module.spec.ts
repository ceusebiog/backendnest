import { Test, TestingModule } from '@nestjs/testing';
import { PersonaModule } from 'src/domains/persona/persona.module';
import { DynamoDBRepository } from 'src/domains/persona/repositories/dynamodb.repository';
import { PersonaService } from 'src/domains/persona/services/persona.service';

describe('PersonaModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PersonaModule],
    }).compile();
  });

  it('debe estar definido', () => {
    expect(module).toBeDefined();
  });

  it('debe proporcionar el servicio PersonaService', () => {
    const personaService = module.get<PersonaService>(PersonaService);
    expect(personaService).toBeDefined();
  });

  it('debe proporcionar el repositorio DynamoDBRepository', () => {
    const dynamoDBRepository =
      module.get<DynamoDBRepository>(DynamoDBRepository);
    expect(dynamoDBRepository).toBeDefined();
  });
});
