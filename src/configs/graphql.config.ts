import { GqlModuleOptions } from '@nestjs/graphql';

const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

const graphqlConfig: GqlModuleOptions = {
  autoSchemaFile: 'schema.gql',
  debug: isDevelopment,
  playground: isDevelopment,
};

export default graphqlConfig;
