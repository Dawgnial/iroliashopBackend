import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('🔍 ENV CHECK:');
    console.log('DB_HOST:', this.configService.get('DB_HOST'));
    console.log('DB_PORT:', this.configService.get('DB_PORT'));
    console.log('DB_USERNAME:', this.configService.get('DB_USERNAME'));
    console.log('DB_PASSWORD:', this.configService.get('DB_PASSWORD'));
    console.log('DB_NAME:', this.configService.get('DB_NAME'));

    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = parseInt(
      this.configService.get<string>('DB_PORT') || '3306',
    );
    const dbUser = this.configService.get<string>('DB_USERNAME');
    const dbPass = this.configService.get<string>('DB_PASSWORD');
    const dbName = this.configService.get<string>('DB_NAME');

    if (!dbHost || !dbPort || !dbUser || !dbPass || !dbName) {
      throw new Error(
        `❌ Missing database configuration:
        DB_HOST=${dbHost}
        DB_PORT=${dbPort}
        DB_USERNAME=${dbUser}
        DB_PASSWORD=${dbPass ? '***' : ''}
        DB_NAME=${dbName}
        `,
      );
    }

    return {
      type: 'mysql',
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPass,
      database: dbName,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    };
  }
}
