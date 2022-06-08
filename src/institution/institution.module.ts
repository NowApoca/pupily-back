import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { Institution } from './institution.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from 'src/middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution]),
    HttpModule,
    ConfigModule
  ],
  providers: [InstitutionService],
  controllers: [InstitutionController]
})

export class InstitutionModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes('institutions');
}}
