import { Controller, Get, Post, Body, Put, Param, Response, Delete, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectPayload, EditProjectPayload } from "./interfaces"
import { Project } from "./project.entity"

@Controller("projects")
export class ProjectController {
  constructor(private readonly appService: ProjectService) {}

  @Post()
  async createProject(@Body() body: CreateProjectPayload, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.createProject(body, res.locals.user.id);
    res.status(HttpStatus.CREATED).send();
  }

  @Put(':projectId')
  async editProject(@Body() body: EditProjectPayload, @Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.editProject(body, params.projectId);
    res.status(HttpStatus.ACCEPTED).send();
  }
  
  @Get()
  async getProjects(): Promise <Project[]> {
    return this.appService.getProjects();
  }
  
  @Get(':projectId')
  async getProject(@Param() params): Promise <Project> {
    return this.appService.getProject(params.projectId);
  }

  @Delete(':projectId')
  async deleteProject(@Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.deleteProject(params.projectId);
    res.status(HttpStatus.ACCEPTED).send();
  }
}

function checkAuth(res){
  const user = res.locals.user;
  if(!user){
    throw new Error("NOT AUTHENTICATED");
  }
}