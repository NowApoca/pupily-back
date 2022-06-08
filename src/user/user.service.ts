import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserPayload, EditPasswordUserPayload, EditUserPayload, LoginUserPayload } from "./interfaces"
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const LOGIN_FAIL_MESSAGE = "INVALID LOGIN";
const INVALID_OLD_PASSWORD = "INVALID_OLD_PASSWORD";
const TOKEN_ALGORITHM = "HS256"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async editUser(body: EditUserPayload, id: number): Promise <void> {
    const editData = {...body};
    await this.userRepository.update({ id }, editData)
  }

  async editUserPassword(body: EditPasswordUserPayload, id: number): Promise <void> {
    const user = await this.userRepository.findOne({
      id: id
    })
    if(!await isValidPassword(body.oldPassword, user.password)){
      throw new Error(INVALID_OLD_PASSWORD);
    }
    await this.userRepository.update({ id }, {
      password: await hashPassword(body.newPassword)
    })
  }

  async createUser(body: CreateUserPayload): Promise <void> {
    const user = {...body};
    user.password = await hashPassword(user.password);
    await this.userRepository.save(user);
  }

  async login(body: LoginUserPayload): Promise <string> {
    const user = await this.userRepository.findOne({
      name: body.name
    })
    if(!user){
      throw new Error(LOGIN_FAIL_MESSAGE);
    }
    if(await isValidPassword(body.password, user.password)){
      const token: string = await (new Promise((resolve, reject) => {
        jwt.sign({
          name: user.name,
          id: user.id,
          type: user.type
        }, process.env.PRIVATE_KEY, { algorithm: TOKEN_ALGORITHM }, function(err, resultToken) {
          if(err){
            reject(err)
            return;
          }
          resolve(resultToken)
        });
      }))
      return token;
    }
    throw new Error(LOGIN_FAIL_MESSAGE);
  }

  async getUsers(){
    const users = await this.userRepository.find();
    return users;
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
