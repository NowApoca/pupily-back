import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PupilyModule } from './pupily/pupily.module';
import { Pupily } from './pupily/pupily.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: process.env.ENV_FILE || '.env',
    validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
      }),
  }), HttpModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSOWRD,
    database: process.env.DB_DATABASE,
    entities: [Pupily],
    synchronize: true
  }),
  PupilyModule,
],
  providers: [],
})

export class AppModule {}
