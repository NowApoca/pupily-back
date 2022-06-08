import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { CreateInstitutionPayload, EditInstitutionPayload } from "./interfaces"

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
  ) {
  }

  async editInstitution(body: EditInstitutionPayload, id: number): Promise <void> {
    const editData = {...body};
    await this.institutionRepository.update({ id }, editData)
  }

  async createInstitution(body: CreateInstitutionPayload): Promise <void> {
    const institution = {...body};
    await this.institutionRepository.save(institution);
  }

  async getInstitutions(){
    const institutions = await this.institutionRepository.find();
    return institutions;
  }

  async deleteInstitution(id: number){
    const institution = await this.institutionRepository.findOne({
      id
    })
    if(institution){
      await this.institutionRepository.remove(institution)
    }
  }

}
