import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionPayload, EditInstitutionPayload } from "./interfaces"
import { Institution } from "./institution.entity"

@Controller("institutions")
export class InstitutionController {
  constructor(private readonly appService: InstitutionService) {}

  @Post()
  async createInstitution(@Body() body: CreateInstitutionPayload): Promise <void> {
    return this.appService.createInstitution(body);
  }

  @Put(':institutionId')
  async favInstitution(@Body() body: EditInstitutionPayload, @Param() params): Promise <void> {
    await this.appService.editInstitution(body, params.institutionId);
  }
  
  @Get()
  async getInstitutions(): Promise <Institution[]> {
    return this.appService.getInstitutions();
  }
}
