import { Test, TestingModule } from '@nestjs/testing';
import { PersonaController } from 'src/api/persona.controller';
import { PersonaService } from 'src/domains/persona/services/persona.service';
import { CreatePersonaDto } from 'src/domains/persona/dtos/create-persona.dto';
import { PersonaEntity } from 'src/domains/persona/entities/persona.entity';
import { PersonaMock } from 'test/mocks/persona.mock';

describe('PersonaController', () => {
  let controller: PersonaController;
  let service: PersonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaController],
      providers: [
        {
          provide: PersonaService,
          useValue: {
            createPersona: jest.fn(),
            getPersonas: jest.fn(),
            getPersonaById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PersonaController>(PersonaController);
    service = module.get<PersonaService>(PersonaService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /personas', () => {
    it('debe crear un persona', async () => {
      const createPersonaDto: CreatePersonaDto = PersonaMock;

      const personaEntity: PersonaEntity = {
        id: '123',
        ...createPersonaDto,
      };

      jest.spyOn(service, 'createPersona').mockResolvedValueOnce(personaEntity);

      const result = await controller.createPersona(createPersonaDto);

      expect(service.createPersona).toHaveBeenCalledWith(createPersonaDto);
      expect(result).toEqual(personaEntity);
    });
  });

  describe('GET /personas', () => {
    it('debe retornar un listado de personas', async () => {
      const personasArray: PersonaEntity[] = [
        {
          id: '123',
          ...PersonaMock,
        },
      ];

      jest.spyOn(service, 'getPersonas').mockResolvedValueOnce(personasArray);

      const result = await controller.getPersonas();

      expect(service.getPersonas).toHaveBeenCalled();
      expect(result).toEqual(personasArray);
    });
  });

  describe('GET /personas/:id', () => {
    it('debe retornar un persona por su id', async () => {
      const id = '123';
      const personaEntity: PersonaEntity = {
        id,
        ...PersonaMock,
      };

      jest
        .spyOn(service, 'getPersonaById')
        .mockResolvedValueOnce(personaEntity);

      const result = await controller.getPersonaById(id);

      expect(service.getPersonaById).toHaveBeenCalledWith(id);
      expect(result).toEqual(personaEntity);
    });
  });
});
