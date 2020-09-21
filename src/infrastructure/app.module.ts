import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  TerminusModule,
  TerminusModuleOptions,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { useAdapter } from '@type-cacheable/redis-adapter';
import * as redis from 'redis';

import { TodoResolver } from '@/infrastructure/graphql/resolvers/todo/todo.resolver';
import { TodoRepository } from '@/infrastructure/repositories/todo/todo.repository';
import { TodoService } from '@/use-cases/todo/todo.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: process.env.NODE_ENV === 'test',
      playground: process.env.NODE_ENV === 'test',
    }),
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useFactory: (
        typeOrmHealthIndicator: TypeOrmHealthIndicator,
      ): TerminusModuleOptions => ({
        disableDeprecationWarnings: true,
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: +process.env.POSTGRESQL_PORT,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database:
        process.env.NODE_ENV !== 'test'
          ? process.env.POSTGRESQL_DATABASE
          : 'local_db_test',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      dropSchema: process.env.NODE_ENV === 'test',
      synchronize: process.env.NODE_ENV === 'test',
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      migrationsRun: false,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    TypeOrmModule.forFeature([TodoRepository]),
  ],
  providers: [TodoResolver, TodoService],
})
export class AppModule {
  onModuleInit() {
    const isNotTestingEnvironment = process.env.NODE_ENV !== 'test';

    // Do not register adapter on testing environment. Avoid caching purposes.
    if (isNotTestingEnvironment) {
      useAdapter(
        redis.createClient({
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        }),
      );
    }
  }
}
