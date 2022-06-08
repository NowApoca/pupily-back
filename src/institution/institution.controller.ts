import { Controller, Get, Post, Body, Put, Param, Response, Delete } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionPayload, EditInstitutionPayload } from "./interfaces"
import { Institution } from "./institution.entity"

@Controller("institutions")
export class InstitutionController {
  constructor(private readonly appService: InstitutionService) {}

  @Post()
  async createInstitution(@Body() body: CreateInstitutionPayload, @Response() res): Promise <void> {
    checkAuth(res);
    return this.appService.createInstitution(body);
  }

  @Put(':institutionId')
  async editInstitution(@Body() body: EditInstitutionPayload, @Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.editInstitution(body, params.institutionId);
  }
  
  @Get()
  async getInstitutions(): Promise <Institution[]> {
    return this.appService.getInstitutions();
  }

  @Delete(':institutionId')
  async deleteInstitution(@Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.deleteInstitution(params.institutionId);
  }
}

function checkAuth(res){
  const user = res.locals.user;
  if(!user){
    throw new Error("NOT AUTHENTICATED");
  }
}