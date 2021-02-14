import { ConnectionOptions } from 'typeorm';

import { environment, isTesting } from '@/consts/envs';

const databases = {
  development: process.env.POSTGRES_DATABASE || 'todo_pg_db',
  test: 'todo_pg_db_test',
};
const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USERNAME || 'todo_pg_user',
  password: process.env.POSTGRES_PASSWORD || 'todo_pg_pass',
  database: process.env.POSTGRES_DATABASE || databases[environment],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  dropSchema: isTesting,
  synchronize: isTesting,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  cli: { migrationsDir: 'src/migrations' },
};

export = typeormConfig;
