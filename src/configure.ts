import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export const configureApp = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      // TODO: Use UserInputError or another similar graphql error
      exceptionFactory: errors => new BadRequestException(errors),
      // Should be true to work properly within package "@hollowverse/class-sanitizer" since original package is unmaintained
      transform: true,
    }),
  );
};
