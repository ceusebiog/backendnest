import { Module } from '@nestjs/common';
import { PersonaService } from './services/persona.service';
import { DynamoDBRepository } from './repositories/dynamodb.repository';

@Module({
  providers: [PersonaService, DynamoDBRepository],
  exports: [PersonaService],
})
export class PersonaModule {}
