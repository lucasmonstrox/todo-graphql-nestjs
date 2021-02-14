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
import { TodoRepository } from '@/repositories/todo/todo.repository';
import { TodoResolver } from '@/resolvers/todo/todo.resolver';
import { TodoService } from '@/services/todo/todo.service';

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
  providers: [TodoResolver, TodoService],
})
export class AppModule {
  onModuleInit() {
    const isNotTestingEnvironment = !isTesting;

    // Do not register adapter on testing environment. Avoid caching purposes.
    if (isNotTestingEnvironment) {
      useAdapter(redis.createClient(redisConfig));
    }
  }
}
