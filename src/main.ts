import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config"

async function runApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get<ConfigService>(ConfigService);
  //const userRepository = app.get<>();
  await app.listen(configService.get("PORT", {infer: true}));
}

function createAdmin(){

}

runApp();
