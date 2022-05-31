import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pupily } from './pupily.entity';
import { CreatePupilyPayload, EditPupilyPayload, LoginPupilyPayload } from "./interfaces"
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

@Injectable()
export class PupilyService {
  constructor(
    @InjectRepository(Pupily)
    private pupilyRepository: Repository<Pupily>,
  ) {
  }

  async editPupily(body: EditPupilyPayload, id: number): Promise <void> {
    const pupily = {...body};
    await this.pupilyRepository.update({ id }, pupily)
  }

  async createPupily(body: CreatePupilyPayload): Promise <void> {
    const pupily = {...body};
    pupily.password = await hashPassword(pupily.password);
    await this.pupilyRepository.save(pupily);
  }

  async login(body: LoginPupilyPayload): Promise <string> {
    const pupily = await this.pupilyRepository.findOne({
      userName: body.userName
    })
    const LOGIN_FAIL_MESSAGE = "INVALID LOGIN";
    if(!pupily){
      throw new Error(LOGIN_FAIL_MESSAGE);
    }
    if(await isValidPassword(body.password, pupily.password)){
      return "TOKEN"
    }
    throw new Error(LOGIN_FAIL_MESSAGE);
  }

  async getPupilies(){
    const pupilies = await this.pupilyRepository.find();
    return pupilies;
  }

}

async function hashPassword(password: string) {
  return await bcrypt.hash(
    password,
    SALT_ROUNDS
  );
}

async function isValidPassword(password: string, currentPassword: string) {
  return bcrypt.compare(password, currentPassword);
}
