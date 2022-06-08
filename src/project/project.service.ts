import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectPayload, EditProjectPayload } from "./interfaces"

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {
  }

  async editProject(body: EditProjectPayload, id: number): Promise <void> {
    const editData = {...body};
    await this.projectRepository.update({ id }, editData)
  }

  async createProject(body: CreateProjectPayload): Promise <void> {
    const project = {...body};
    await this.projectRepository.save(project);
  }

  async getProjects(){
    const projects = await this.projectRepository.find();
    return projects;
  }

}
