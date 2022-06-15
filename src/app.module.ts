import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { InstitutionModule } from './institution/institution.module';
import { User } from './user/user.entity';
import { Project } from './project/project.entity';
import { Institution } from './institution/institution.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: process.env.ENV_FILE || '.env',
    validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
      }),
  }), HttpModule,
  TypeOrmModule.forRoot({
    type: (process.env.DB_TYPE as any) || 'postgres', // el any va pq no pude importar esos valores de mongo
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSOWRD,
    database: process.env.DB_DATABASE,
    entities: [User, Project, Institution],
    logging: true,
    synchronize: true
  }),
  UserModule, ProjectModule, InstitutionModule,
],
  providers: [],
})

export class AppModule {}
