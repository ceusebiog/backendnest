import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PersonaService } from 'src/domains/persona/services/persona.service';
import { PeliculaService } from 'src/domains/swapi/services/pelicula.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('debe estar definido', () => {
    expect(module).toBeDefined();
  });

  it('debe inyectar correctamente el PersonaService desde PersonaModule', () => {
    const personaService = module.get<PersonaService>(PersonaService);
    expect(personaService).toBeDefined();
  });

  it('debe inyectar correctamente el PeliculaService desde SwapiModule', () => {
    const peliculaService = module.get<PeliculaService>(PeliculaService);
    expect(peliculaService).toBeDefined();
  });
});
