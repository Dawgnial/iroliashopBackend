import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfig } from 'src/common/configs/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../authentication/auth.module';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { BasketModule } from '../basket/basket.module';
import { OrderModule } from '../order/order.module';

import { User } from '../user/entities/user.entity';
import { InitializeAdmin } from 'src/common/services/initialize-admin.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitializeAdmin],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly InitializeService: InitializeAdmin) {}

  async onApplicationBootstrap() {
    await this.InitializeService.create();
  }
}
