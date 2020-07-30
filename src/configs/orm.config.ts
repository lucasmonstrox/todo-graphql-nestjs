import { ConnectionOptions } from 'typeorm';

import { ENV, IS_TESTING } from 'consts/envs';

const DATABASES = {
  development: 'local_db',
  test: 'local_db_test',
};

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME || 'local_dev',
  password: process.env.DB_PASSWORD || 'local_dev',
  database: process.env.DB_DATABASE || DATABASES[ENV],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  dropSchema: IS_TESTING,
  synchronize: IS_TESTING,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = ormConfig;
