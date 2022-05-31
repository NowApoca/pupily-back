import { Controller, Get, Post, Body, Put, Param, Patch } from '@nestjs/common';
import { PupilyService } from './pupily.service';
import { CreatePupilyPayload, EditPupilyPayload, LoginPupilyPayload } from "./interfaces"
import { Pupily } from "./pupily.entity"

@Controller("pupilies")
export class PupilyController {
  constructor(private readonly appService: PupilyService) {}

  @Post()
  async createPupily(@Body() body: CreatePupilyPayload): Promise <void> {
    return this.appService.createPupily(body);
  }

  @Post("login")
  async login(@Body() body: LoginPupilyPayload): Promise <string> {
    return this.appService.login(body);
  }

  @Put(':pupilyId')
  async favPupily(@Body() body: EditPupilyPayload, @Param() params): Promise <void> {
    await this.appService.editPupily(body, params.pupilyId);
  }

  @Get()
  async getPupilyes(): Promise <Pupily[]> {
    return this.appService.getPupilies();
  }
}
