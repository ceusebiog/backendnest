import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Genero } from './types';

export class CreatePersonaDto {
  @ApiProperty({
    description: 'El nombre de la Persona',
    example: 'Anakin Skywalker',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Altura de la persona',
    example: 172,
    required: true,
    type: Number,
  })
  @IsNumber()
  altura: number;

  @ApiProperty({
    description: 'Peso de la persona',
    example: 77,
    required: true,
    type: Number,
  })
  @IsNumber()
  masa: number;

  @ApiProperty({
    description: 'La persona es donadora de organos',
    example: true,
    default: true,
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  donadorOrganos: boolean;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: 'Fecha de nacimiento de la persona',
    required: true,
    example: '1960-05-23',
    type: Date,
  })
  @IsDate()
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
