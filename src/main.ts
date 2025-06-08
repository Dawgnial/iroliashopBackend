import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { InitializeSwagger } from './common/configs/swagger.config';
import { ENV } from './common/constant/env';
import * as cors from 'cors';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS settings
  app.use(
    cors({
      origin: ['https://iroliashop.ir', 'https://www.iroliashop.ir'],
      credentials: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  InitializeSwagger(app);
  await app.listen(process.env.APP_PORT);
  console.log(`Docs : http://localhost:${ENV.App_Port}/docs`);
}
bootstrap();
