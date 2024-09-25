import { Injectable } from '@nestjs/common';
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
    const persona: PersonaEntity = {
      id: uuidv4(),
      ...createPersonaDto,
    };
    await this.dynamoDBRepository.save(persona);
    return persona;
  }

  async getPersonas(): Promise<PersonaEntity[]> {
    return this.dynamoDBRepository.getAll();
  }

  async getPersonaById(id: string): Promise<PersonaEntity> {
    return this.dynamoDBRepository.getById(id);
  }
}
