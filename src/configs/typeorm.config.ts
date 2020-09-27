import { ConnectionOptions } from 'typeorm';

import { environment, isTesting } from '@/consts/envs';

const databases = {
  development: 'local_db',
  test: 'local_db_test',
};

const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT ? +process.env.MYSQL_PORT : 5432,
  username: process.env.MYSQL_USERNAME || 'local_dev',
  password: process.env.MYSQL_PASSWORD || 'local_dev',
  database: process.env.MYSQL_DATABASE || databases[environment],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  dropSchema: isTesting,
  synchronize: isTesting,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = typeormConfig;
