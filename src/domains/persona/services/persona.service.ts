import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DynamoDBRepository } from '../repositories/dynamodb.repository';
import { PersonaEntity } from '../entities/persona.entity';
import { CreatePersonaDto } from '../dtos/create-persona.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PersonaService {
  constructor(private readonly dynamoDBRepository: DynamoDBRepository) {}

  async createPersona(
    createPersonaDto: CreatePersonaDto,
  ): Promise<PersonaEntity> {
    try {
      const persona: PersonaEntity = {
        id: uuidv4(),
        ...createPersonaDto,
      };
      await this.dynamoDBRepository.save(persona);
      return persona;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error guardando los datos de la persona',
      );
    }
  }

  async getPersonas(): Promise<PersonaEntity[]> {
    try {
      return await this.dynamoDBRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error obteniendo el listado de registros de personas',
      );
    }
  }

  async getPersonaById(id: string): Promise<PersonaEntity> {
    try {
      const persona = await this.dynamoDBRepository.getById(id);

      if (!persona) {
        throw new NotFoundException(`Persona con ID ${id} no encontrado`);
      }

      return persona;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error obteniendo el registro de la persona con ID ${id}`,
      );
    }
  }
}
