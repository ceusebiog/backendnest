import { Test, TestingModule } from '@nestjs/testing';
import { PeliculaService } from 'src/domains/swapi/services/pelicula.service';
import { PersonaService } from 'src/domains/swapi/services/persona.service';
import { SwapiModule } from 'src/domains/swapi/swapi.module';

describe('SwapiModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [SwapiModule],
    }).compile();
  });

  it('debe estar definido', () => {
    expect(module).toBeDefined();
  });

  it('debe proporcionar el servicio PersonaService', () => {
    const personaService = module.get<PersonaService>(PersonaService);
    expect(personaService).toBeDefined();
  });

  it('debe proporcionar el servicio PeliculaService', () => {
    const peliculaService = module.get<PeliculaService>(PeliculaService);
    expect(peliculaService).toBeDefined();
  });
});
