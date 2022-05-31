import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PupilyService } from './pupily.service';
import { PupilyController } from './pupily.controller';
import { Pupily } from './pupily.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pupily]),
    HttpModule,
    ConfigModule
  ],
  providers: [PupilyService],
  controllers: [PupilyController]
})

export class PupilyModule {}
