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
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Pipe برای validation ورودی‌ها با transform فعال
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // فعال‌سازی Swagger
  InitializeSwagger(app);

  // اجرا
  const port = process.env.APP_PORT || ENV.App_Port || 3000;
  await app.listen(port);

  console.log(`Docs : http://localhost:${port}/docs`);
}

bootstrap();
