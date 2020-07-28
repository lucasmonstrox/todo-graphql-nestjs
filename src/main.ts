import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // TODO: Use UserInputError or another similar graphql error
      exceptionFactory: errors => new BadRequestException(errors),
      // Should be true to work properly within package "@hollowverse/class-sanitizer" since original package is unmaintained
      transform: true,
    }),
  );

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
