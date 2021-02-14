// eslint-disable-next-line @typescript-eslint/no-var-requires
const transformer = require('@nestjs/graphql/plugin');
module.exports.name = 'nestjs-graphql-transformer';
module.exports.version = 1;
module.exports.factory = cs => transformer.before({}, cs.tsCompiler.program);
