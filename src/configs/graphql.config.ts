import { GqlModuleOptions } from '@nestjs/graphql';

import { IS_DEVELOPMENT } from 'consts/envs';

const graphqlConfig: GqlModuleOptions = {
  autoSchemaFile: 'schema.gql',
  debug: IS_DEVELOPMENT,
  playground: IS_DEVELOPMENT,
};

export default graphqlConfig;
