import { ApiProperty } from '@nestjs/swagger';

export class SWPersonaEntity {
  @ApiProperty({
    description: 'Id del registro de la persona del universo de Star Wars',
    example: '1',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'El nombre de la Persona',
    example: 'Anakin Skywalker',
    type: String,
  })
  nombre: string;

  @ApiProperty({
    description: 'Altura de la persona',
    example: 172,
    type: String,
  })
  altura: string;

  @ApiProperty({
    description: 'Peso de la persona',
    example: 77,
    type: String,
  })
  masa: string;

  @ApiProperty({
    description: 'Color de cabello de la persona',
    example: 'blond',
    type: String,
  })
  colorCabello: string;

  @ApiProperty({
    description: 'Color de piel de la persona',
    example: 'fair',
    type: String,
  })
  colorPiel: string;

  @ApiProperty({
    description: 'Color de los ojos de la persona',
    example: 'blue',
    type: String,
  })
  colorOjos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento de la persona',
    example: '19BBY',
    type: String,
  })
  fechaNacimiento: string;

  @ApiProperty({
    description: 'Genero de la persona',
    example: 'male',
    type: String,
  })
  genero: string;

  @ApiProperty({
    description: 'Url del registro del Mundo natal de la persona',
    example: 'https://swapi.dev/api/planets/1/',
    type: String,
  })
  mundoNatal: string;

  @ApiProperty({
    description:
      'Url de los registros de las peliculas donde aparece la persona',
    example: ['https://swapi.dev/api/films/1/'],
    type: [String],
  })
  peliculas: string[];

  @ApiProperty({
    description: 'Url de los registros de las Especies de la persona',
    example: [],
    type: [String],
  })
  especies: string[];

  @ApiProperty({
    description: 'Url de los registros de los Vehiculos de la persona',
    example: ['https://swapi.dev/api/vehicles/14/'],
    type: [String],
  })
  vehiculos: string[];

  @ApiProperty({
    description: 'Url de los registros de las Naves Estelares de la persona',
    example: ['https://swapi.dev/api/starships/12/'],
    type: [String],
  })
  navesEstelares: string[];

  @ApiProperty({
    description: 'Fecha de creación del registro de la persona',
    example: '2014-12-09T13:50:51.644000Z',
    type: String,
  })
  creado: string;

  @ApiProperty({
    description: 'Fecha de modificación del registro de la persona',
    example: '2014-12-20T21:17:56.891000Z',
    type: String,
  })
  editado: string;

  @ApiProperty({
    description: 'Url del registro de la persona',
    example: 'https://swapi.dev/api/people/1/',
    type: String,
  })
  url: string;

  static fromApiEntity(data: PeopleEntity, index: string): SWPersonaEntity {
    return {
      id: index,
      nombre: data.name,
      altura: data.height,
      masa: data.mass,
      colorCabello: data.hair_color,
      colorPiel: data.skin_color,
      colorOjos: data.eye_color,
      fechaNacimiento: data.birth_year,
      genero: data.gender,
      mundoNatal: data.homeworld,
      peliculas: data.films,
      especies: data.species,
      vehiculos: data.vehicles,
      navesEstelares: data.starships,
      creado: data.created,
      editado: data.edited,
      url: data.url,
    };
  }
}

export class PeopleEntity {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}
