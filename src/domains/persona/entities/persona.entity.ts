import { ApiProperty } from '@nestjs/swagger';
import { Genero } from '../dtos/types';

export class PersonaEntity {
  @ApiProperty({
    description: 'Id del registro de la Persona',
    example: '990ceba4-1924-4353-bc60-95efdc3cb1cb',
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
    type: Number,
  })
  altura: number;

  @ApiProperty({
    description: 'Peso de la persona',
    example: 77,
    type: Number,
  })
  masa: number;

  @ApiProperty({
    description: 'La persona es donadora de organos',
    example: true,
    default: true,
    type: Boolean,
  })
  donadorOrganos: boolean;

  @ApiProperty({
    description: 'Fecha de nacimiento de la persona',
    type: Date,
  })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'La persona es donadora de organos',
    enum: Genero,
    type: Genero,
    example: 'Masculino',
    required: true,
  })
  genero: Genero;
}
