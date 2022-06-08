import { Controller, Get, Post, Body, Put, Param, Patch, Request, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPayload, EditPasswordUserPayload, EditUserPayload, LoginUserPayload } from "./interfaces"
import { User } from "./user.entity"
import { UserType } from './interfaces';

const USER_NOT_ADMIN = "USER_NOT_ADMIN";
const USER_NOT_AUTHENTICATED = "USER_NOT_AUTHENTICATED";

@Controller("users")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserPayload): Promise <void> {
    return this.appService.createUser(body);
  }

  @Post("admin")
  async createAdmin(@Body() body: CreateUserPayload, @Request() req, @Response() res): Promise <void> {
    if(!res.locals.user){
      throw new Error(USER_NOT_AUTHENTICATED);
    }
    if(res.locals.user.type != UserType.ADMIN){
      throw new Error(USER_NOT_ADMIN);
    }
    body.type = UserType.ADMIN;
    return this.appService.createUser(body);
  }

  @Post("login")
  async login(@Body() body: LoginUserPayload): Promise <string> {
    return this.appService.login(body);
  }

  @Put(':userId')
  async favUser(@Body() body: EditUserPayload, @Param() params): Promise <void> {
    await this.appService.editUser(body, params.userId);
  }

  @Patch(':userId/password')
  async changePassword(@Body() body: EditPasswordUserPayload, @Param() params): Promise <void> {
    await this.appService.editUserPassword(body, params.userId);
  }
  
  @Get()
  async getUsers(): Promise <User[]> {
    return this.appService.getUsers();
  }
}
