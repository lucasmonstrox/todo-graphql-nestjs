import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';

export const configureApp = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationErrors => {
        const errors = {};

        for (const error of validationErrors) {
          const keyNotExistsInErrors = !errors[error.property];

          if (keyNotExistsInErrors) {
            errors[error.property] = error.constraints;
          }
        }

        return new UserInputError('Bad user input', { errors });
      },
      // Should be true to work properly within package "@hollowverse/class-sanitizer" since original package is unmaintained
      transform: true,
    }),
  );
};
