import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectPayload, EditProjectPayload } from "./interfaces"
import { User } from 'src/user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async editProject(body: EditProjectPayload, id: number): Promise <void> {
    const editData = {...body};
    await this.projectRepository.update({ id }, editData)
  }

  async createProject(body: CreateProjectPayload, userId): Promise <void> {
    const user = await this.userRepository.findOne({
      id: userId
    });
    const project = {...body};
    project.user = user;
    await this.projectRepository.save(project);
  }

  async getProjects(){
    const projects = await this.projectRepository.find();
    return projects;
  }

  async deleteProject(id: number){
    const project = await this.projectRepository.findOne({
      id
    })
    if(project){
      await this.projectRepository.remove(project)
    }
  }

}
