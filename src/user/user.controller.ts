import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Controller, Get, Post } from '@nestjs/common';
import { ConfigEnum } from 'src/enum/config.enum';
import { log } from 'node:console';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private UserService: UserService,
    private ConfigService: ConfigService,
  ) {}
  @Get('all')
  getUserAll() {
    let userList = this.UserService.findAll();

    return userList;
  }

  @Post('create')
  postAddUser() {
    let userList = this.UserService.create({
      username: 'admin',
      password: '123456',
    } as User);
    return userList;
  }
  @Get('findOneUserProfile')
  async findOneUserProfile() {
    let user = await this.UserService.findUserWithProfile(1);
    console.log('print ~ UserController ~ findOneUserProfile ~ user:', user);
    return user;
  }
  @Get('findUserLogs')
  async findUserLogs() {
    let user = await this.UserService.findUserWithLogs(1);
    console.log('print ~ UserController ~ findOneUserProfile ~ user:', user);
    return user;
  }
  @Get('countUserLogs')
  async countUserLogs() {
    let count = await this.UserService.countUserLogs(1);
    return count;
  }
}
