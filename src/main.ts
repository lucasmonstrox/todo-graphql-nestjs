import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/infrastructure/app.module';
import { configureApp } from '@/infrastructure/configure';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  const port = +process.env.APP_PORT || 3000;

  await app.listen(port);
}

bootstrap();
