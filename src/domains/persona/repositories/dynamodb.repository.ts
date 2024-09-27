import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { PersonaEntity } from '../entities/persona.entity';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class DynamoDBRepository {
  private readonly tableName = process.env.DYNAMODB_TABLE || 'Personas';

  async save(persona: PersonaEntity): Promise<void> {
    const comand: PutCommand = new PutCommand({
      TableName: this.tableName,
      Item: persona,
    });
    await docClient.send(comand);
  }

  async getAll(): Promise<PersonaEntity[]> {
    const comand: ScanCommand = new ScanCommand({
      TableName: this.tableName,
    });
    const result = await docClient.send(comand);
    return result.Items as PersonaEntity[];
  }

  async getById(id: string): Promise<PersonaEntity> {
    const comand: GetCommand = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });
    const result = await docClient.send(comand);
    return result.Item as PersonaEntity;
  }
}
