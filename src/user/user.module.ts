import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from "../middleware"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    ConfigModule
  ],
  providers: [UserService],
  controllers: [UserController]
})

export class UserModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes('users');
}}
