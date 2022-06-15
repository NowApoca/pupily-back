import { Controller, Get, Post, Body, Put, Param, Response, Delete, HttpStatus } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionPayload, EditInstitutionPayload } from "./interfaces"
import { Institution } from "./institution.entity"

@Controller("institutions")
export class InstitutionController {
  constructor(private readonly appService: InstitutionService) {}

  @Post()
  async createInstitution(@Body() body: CreateInstitutionPayload, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.createInstitution(body);
    res.status(HttpStatus.CREATED).send();
  }

  @Put(':institutionId')
  async editInstitution(@Body() body: EditInstitutionPayload, @Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.editInstitution(body, params.institutionId);
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get(':institutionId')
  async getInstitution(@Param() params): Promise <Institution> {
    return this.appService.getInstitution(params.institutionId);
  }
  
  @Get()
  async getInstitutions(): Promise <Institution[]> {
    return this.appService.getInstitutions();
  }

  @Delete(':institutionId')
  async deleteInstitution(@Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.deleteInstitution(params.institutionId);
    res.status(HttpStatus.ACCEPTED).send();
  }
}

function checkAuth(res){
  const user = res.locals.user;
  if(!user){
    throw new Error("NOT AUTHENTICATED");
  }
}