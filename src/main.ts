import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { InitializeSwagger } from './common/configs/swagger.config';
import { ENV } from './common/constant/env';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ اضافه کردن prefix برای همه‌ی مسیرهای API
  app.setGlobalPrefix('api/v1');

  // تنظیم CORS برای اتصال فرانت
  app.enableCors({
    origin: 'https://www.iroliashop.ir',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Pipe برای validation ورودی‌ها
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // فعال‌سازی Swagger
  InitializeSwagger(app);

  // اجرا
  await app.listen(process.env.APP_PORT);
  console.log(`Docs : http://localhost:${ENV.App_Port}/docs`);
}

bootstrap();
