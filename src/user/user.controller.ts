import { Controller, Get, Post, Body, Put, Param, Patch, Request, Response, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPayload, EditPasswordUserPayload, EditUserPayload, LoginUserPayload, ResLoginUser } from "./interfaces"
import { User } from "./user.entity"
import { UserType } from './interfaces';

const USER_NOT_ADMIN = "USER_NOT_ADMIN";
const USER_NOT_AUTHENTICATED = "USER_NOT_AUTHENTICATED";
const USER_NOT_SPONSOR = "USER_NOT_SPONSOR";

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
    await this.appService.createUser(body);
    res.status(HttpStatus.CREATED).send();
  }

  @Post("login")
  async login(@Body() body: LoginUserPayload): Promise <ResLoginUser> {
    return this.appService.login(body);
  }

  @Post("sponsor/:userId")
  async sponsorPupily(@Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    if(res.locals.user.type != UserType.SPONSOR){
      throw new Error(USER_NOT_SPONSOR);
    }
    await this.appService.sponsorPupily(parseInt(params.userId), res.locals.user.id);
    res.status(HttpStatus.CREATED).send();
  }

  @Post("sponsor/remove/:userId")
  async deleteSponsor(@Param() params, @Response() res): Promise <void> {
    checkAuth(res);
    if(res.locals.user.type != UserType.SPONSOR){
      throw new Error(USER_NOT_SPONSOR);
    }
    await this.appService.removePupily(parseInt(params.userId), res.locals.user.id);
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Put(':userId')
  async favUser(@Body() body: EditUserPayload, @Param() params): Promise <void> {
    await this.appService.editUser(body, params.userId);
  }

  @Patch(':userId/password')
  async changePassword(@Body() body: EditPasswordUserPayload, @Param() params): Promise <void> {
    await this.appService.editUserPassword(body, params.userId);
  }
  
  @Get(":userId")
  async getUser(@Param() params): Promise <User> {
    return this.appService.getUser(params.userId);
  }
  
  @Get()
  async getUsers(): Promise <User[]> {
    return this.appService.getUsers();
  }
}

function checkAuth(res){
  const user = res.locals.user;
  if(!user){
    throw new Error("NOT AUTHENTICATED");
  }
}
