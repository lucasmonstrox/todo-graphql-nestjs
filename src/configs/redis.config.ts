import { ClientOpts } from 'redis';
const redisConfig: ClientOpts = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
};
export = redisConfig;
