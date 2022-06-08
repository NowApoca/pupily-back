import { Controller, Get, Post, Body, Put, Param, Response, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectPayload, EditProjectPayload } from "./interfaces"
import { Project } from "./project.entity"

@Controller("projects")
export class ProjectController {
  constructor(private readonly appService: ProjectService) {}

  @Post()
  async createProject(@Body() body: CreateProjectPayload, @Response() res): Promise <void> {
    checkAuth(res);
    return this.appService.createProject(body, res.locals.user.id);
  }

  @Put(':projectId')
  async editProject(@Body() body: EditProjectPayload, @Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.editProject(body, params.projectId);
  }
  
  @Get()
  async getProjects(): Promise <Project[]> {
    return this.appService.getProjects();
  }

  @Delete(':projectId')
  async deleteProject(@Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    await this.appService.deleteProject(params.projectId);
  }
}

function checkAuth(res){
  const user = res.locals.user;
  if(!user){
    throw new Error("NOT AUTHENTICATED");
  }
}