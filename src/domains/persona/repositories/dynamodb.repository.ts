import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PersonaEntity } from '../entities/persona.entity';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class DynamoDBRepository {
  private readonly tableName = process.env.DYNAMODB_TABLE || 'Personas';

  async save(persona: PersonaEntity): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: persona,
    };
    await dynamoDB.put(params).promise();
  }

  async getAll(): Promise<PersonaEntity[]> {
    const params = {
      TableName: this.tableName,
    };
    const result = await dynamoDB.scan(params).promise();
    return result.Items as PersonaEntity[];
  }

  async getById(id: string): Promise<PersonaEntity> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const result = await dynamoDB.get(params).promise();
    return result.Item as PersonaEntity;
  }
}
