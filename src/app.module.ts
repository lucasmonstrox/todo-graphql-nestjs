import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import graphqlConfig from './configs/graphql.config';
import ormConfig from './configs/orm.config';
import { HealthController } from './controllers/health/health.controller';
import { TodoRepository } from './repositories/todo/todo.repository';
import { TodoResolver } from './resolvers/todo/todo.resolver';
import { TodoService } from './services/todo/todo.service';

@Module({
  controllers: [HealthController],
  imports: [
    GraphQLModule.forRoot(graphqlConfig),
    TerminusModule,
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([TodoRepository]),
  ],
  providers: [TodoResolver, TodoService],
})
export class AppModule {}
