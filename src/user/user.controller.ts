import { Controller, Get, Post, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    // this.logger.error(`Connecting to `);
  }
  @Get('all')
  getUserAll() {
    let host = this.configService.get('DB');
    console.log('print ~ UserController ~ getUserAll ~ host:', host);
    throw new RequestTimeoutException('Request Timeout');
    let userList = this.userService.findAll();
    return userList;
  }

  @Post('create')
  postAddUser() {
    let userList = this.userService.create({
      username: 'admin',
      password: '123456',
    } as User);
    return userList;
  }
  @Get('findOneUserProfile')
  async findOneUserProfile() {
    let user = await this.userService.findUserWithProfile(1);
    console.log('print ~ UserController ~ findOneUserProfile ~ user:', user);
    return user;
  }
  @Get('findUserLogs')
  async findUserLogs() {
    let user = await this.userService.findUserWithLogs(1);
    console.log('print ~ UserController ~ findOneUserProfile ~ user:', user);
    return user;
  }
  @Get('countUserLogs')
  async countUserLogs() {
    let count = await this.userService.countUserLogs(1);
    return count;
  }
}
