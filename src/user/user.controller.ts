import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreactUserDto, LoginUserDto, UserQuery } from './dto/get-user-dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    // this.logger.error(`Connecting to `);
  }
  @Get('all')
  getUserAll() {
    let userList = this.userService.findAll();
    return userList;
  }

  @Post('create')
  async postAddUser(@Body() dot: CreactUserDto) {
    this.logger.log('print ~ UserController ~ postAddUser ~ dot:', dot);
    return this.userService.create(dot);
  }
  @Post('login')
  async getLogin(@Body() dot: LoginUserDto) {
    let user = await this.userService.getLogin(dot);
    console.log('print ~ UserController ~ getLogin ~ user:', user);
    if (user) {
      return {
        code: 200,
        msg: '登录成功',
        data: user,
      };
    } else {
      return {
        code: 400,
        msg: '登录失败',
        data: null,
      };
    }
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

  @Get('userWithProfileWithLogs')
  async getUserWithProfileWithLogs(@Query() query: UserQuery) {
    console.log(
      'print ~ UserController ~ getUserWithProfileWithLogs ~ query:',
      query,
    );
    let user = await this.userService.findUserWithProfileWithLogs(query);
    return user;
  }
}
