import { GqlModuleOptions } from '@nestjs/graphql';

import { isDevelopment } from '@/consts/envs';

const graphqlConfig: GqlModuleOptions = {
  autoSchemaFile: 'schema.gql',
  debug: isDevelopment,
  playground: isDevelopment,
};

export = graphqlConfig;
