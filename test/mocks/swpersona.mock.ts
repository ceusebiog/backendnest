import {
  PeopleEntity,
  SWPersonaEntity,
} from 'src/domains/swapi/entities/persona.entity';

export const SWPersonaMock: SWPersonaEntity = {
  id: '1',
  nombre: 'Luke Skywalker',
  altura: '172',
  masa: '77',
  colorCabello: 'blond',
  colorPiel: 'fair',
  colorOjos: 'blue',
  fechaNacimiento: '19BBY',
  genero: 'male',
  mundoNatal: 'https://swapi.dev/api/planets/1/',
  peliculas: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  especies: [],
  vehiculos: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
  navesEstelares: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  creado: '2014-12-09T13:50:51.644000Z',
  editado: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

export const PeopleMock: PeopleEntity = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};
