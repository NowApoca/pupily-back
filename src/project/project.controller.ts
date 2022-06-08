import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectPayload, EditProjectPayload } from "./interfaces"
import { Project } from "./project.entity"

@Controller("projects")
export class ProjectController {
  constructor(private readonly appService: ProjectService) {}

  @Post()
  async createProject(@Body() body: CreateProjectPayload): Promise <void> {
    return this.appService.createProject(body);
  }

  @Put(':projectId')
  async favProject(@Body() body: EditProjectPayload, @Param() params): Promise <void> {
    await this.appService.editProject(body, params.projectId);
  }
  
  @Get()
  async getProjects(): Promise <Project[]> {
    return this.appService.getProjects();
  }
}
