import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { CreateInstitutionPayload, EditInstitutionPayload } from "./interfaces"

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private projectRepository: Repository<Institution>,
  ) {
  }

  async editInstitution(body: EditInstitutionPayload, id: number): Promise <void> {
    const editData = {...body};
    await this.projectRepository.update({ id }, editData)
  }

  async createInstitution(body: CreateInstitutionPayload): Promise <void> {
    const project = {...body};
    await this.projectRepository.save(project);
  }

  async getInstitutions(){
    const projects = await this.projectRepository.find();
    return projects;
  }

}
