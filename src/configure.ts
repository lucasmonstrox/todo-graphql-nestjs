import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
export const configureApp = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationErrors => {
        const errors = {};
        for (const { constraints, property } of validationErrors) {
          const keyNotExistsInErrors = !errors[property];
          if (keyNotExistsInErrors) {
            errors[property] = constraints;
          }
        }
        return new UserInputError('BAD_USER_INPUT', { errors });
      },
    }),
  );
};
