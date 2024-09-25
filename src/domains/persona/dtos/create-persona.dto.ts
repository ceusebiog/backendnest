import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  altura: string;

  @IsString()
  @IsNotEmpty()
  masa: string;
}
