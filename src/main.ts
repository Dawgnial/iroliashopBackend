import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { InitializeSwagger } from './common/configs/swagger.config';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  InitializeSwagger(app);

  const port = process.env.PORT || process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`Docs: http://localhost:${port}/docs`);
}

bootstrap();
