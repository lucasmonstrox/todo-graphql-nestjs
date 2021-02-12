import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  TerminusModule,
  TerminusModuleOptions,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { useAdapter } from '@type-cacheable/redis-adapter';
import * as redis from 'redis';
import graphqlConfig from '@/configs/graphql.config';
import redisConfig from '@/configs/redis.config';
import typeormConfig from '@/configs/typeorm.config';
import { isTesting } from '@/consts/envs';
import { TodoRepository } from '@/repositories/todo.repository';
import { CreateTodoResolver } from '@/resolvers/create-todo.resolver';
import { DeleteTodoResolver } from '@/resolvers/delete-todo.resolver';
import { FindAllTodosResolver } from '@/resolvers/find-all-todos.resolver';
import { FindTodoResolver } from '@/resolvers/find-todo.resolver';
import { UpdateTodoResolver } from '@/resolvers/update-todo.resolver';
import { CreateTodoService } from '@/services/create-todo.service';
import { DeleteTodoService } from '@/services/delete-todo.service';
import { FindAllTodosService } from '@/services/find-all-todos.service';
import { FindTodoService } from '@/services/find-todo.service';
import { UpdateTodoService } from '@/services/update-todo.service';
@Module({
  imports: [
    GraphQLModule.forRoot(graphqlConfig),
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useFactory: (
        typeOrmHealthIndicator: TypeOrmHealthIndicator,
      ): TerminusModuleOptions => ({
        endpoints: [
          {
            healthIndicators: [
              async () => await typeOrmHealthIndicator.pingCheck('database'),
            ],
            url: 'health',
          },
        ],
      }),
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([TodoRepository]),
  ],
  providers: [
    CreateTodoService,
    CreateTodoResolver,
    DeleteTodoService,
    DeleteTodoResolver,
    FindTodoService,
    FindTodoResolver,
    FindAllTodosService,
    FindAllTodosResolver,
    UpdateTodoService,
    UpdateTodoResolver,
  ],
})
export class AppModule {
  onModuleInit() {
    // Do not register adapter on testing environment. Avoid caching purposes.
    if (isTesting) {
      return;
    }
    useAdapter(redis.createClient(redisConfig));
  }
}
