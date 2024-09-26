import { ApiProperty } from '@nestjs/swagger';

export class SWPeliculaEntity {
  @ApiProperty({
    description: 'Id del registro de la pelicula de Star Wars',
    example: '1',
    type: String,
  })
  id: string;

  @ApiProperty({
    description:
      'Url de los registros de las Personajess que aparecen en la pelicula',
    example: ['https://swapi.dev/api/people/1/'],
    type: [String],
  })
  personajes: string[];

  @ApiProperty({
    description: 'Fecha de creación del registro de la pelicula',
    example: '2014-12-10T14:23:31.880000Z',
    type: String,
  })
  fechaCreacion: string;

  @ApiProperty({
    description: 'Nombre del director de la pelicula',
    example: 'George Lucas',
    type: String,
  })
  director: string;

  @ApiProperty({
    description: 'Fecha de edición del registro de la pelicula',
    example: '2014-12-12T11:24:39.858000Z',
    type: String,
  })
  fechaEditado: string;

  @ApiProperty({
    description: 'Número de episodio de la pelicula',
    example: 4,
    type: Number,
  })
  episodioId: number;

  @ApiProperty({
    description: 'Texto que aparece en la introducción de la pelicula',
    example: 'It is a period of civil war.\n\nRebel spaceships...',
    type: String,
  })
  textoIntroductorio: string;

  @ApiProperty({
    description:
      'Url de los registros de los planetas que aparecen en la pelicula',
    example: ['https://swapi.dev/api/planets/1/'],
    type: [String],
  })
  planetas: string[];

  @ApiProperty({
    description: 'Nombre del Productor de la pelicula',
    example: 'Gary Kurtz, Rick McCallum',
    type: String,
  })
  productor: string;

  @ApiProperty({
    description: 'Fecha de estreno de la pelicula',
    example: '1977-05-25',
    type: String,
  })
  fechaLanzamiento: string;

  @ApiProperty({
    description:
      'Url de los registros de las especies que aparecen en la pelicula',
    example: ['https://swapi.dev/api/species/1/'],
    type: [String],
  })
  especies: string[];

  @ApiProperty({
    description:
      'Url de los registros de las naves estelares que aparecen en la pelicula',
    example: ['https://swapi.dev/api/starships/2/'],
    type: [String],
  })
  navesEstelares: string[];

  @ApiProperty({
    description: 'Titulo de la pelicula',
    example: 'A New Hope',
    type: String,
  })
  titulo: string;

  @ApiProperty({
    description: 'Url del registro de la pelicula',
    example: 'https://swapi.dev/api/films/1/',
    type: String,
  })
  url: string;

  @ApiProperty({
    description:
      'Url de los registros de los vehiculos que aparecen en la pelicula',
    example: ['https://swapi.dev/api/vehicles/4/'],
    type: [String],
  })
  vehiculos: string[];

  static fromApiEntity(data: any, index: string): SWPeliculaEntity {
    return {
      id: index,
      personajes: data.characters,
      fechaCreacion: data.created,
      director: data.director,
      fechaEditado: data.edited,
      episodioId: data.episode_id,
      textoIntroductorio: data.opening_crawl,
      planetas: data.planets,
      productor: data.producer,
      fechaLanzamiento: data.release_date,
      especies: data.species,
      navesEstelares: data.starships,
      titulo: data.title,
      url: data.url,
      vehiculos: data.vehicles,
    };
  }
}
