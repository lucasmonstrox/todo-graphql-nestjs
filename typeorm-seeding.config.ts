import * as path from 'path';
// TODO: add type
const typeormForSeedConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'todo_pg_user',
  password: 'todo_pg_pass',
  database: 'todo_pg_db',
  autoLoadEntities: true,
  entities: [path.resolve(__dirname, '**/*.entity.{ts,js}')],
  synchronize: true,
  logging: true,
  factories: [path.resolve(__dirname, '**/*.factory.{ts,js}')],
  seeds: [path.resolve(__dirname, '**/*.seed.{.ts,.js}')],
};
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export = typeormForSeedConfig;
