import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from './../logs/logs.entity';
import { UserQuery } from './dto/get-user-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Logs) private logsRepository: Repository<Logs>,
  ) {}

  async create(user: UserQuery) {
    const tmpUser = this.userRepository.create(user);
    let newUser = await this.userRepository.save(tmpUser);
    return newUser;
  }

  //登录
  async getLogin(dot: UserQuery) {
    const user = await this.userRepository.findOne({
      where: {
        username: dot.username,
        password: dot.password,
      },
    });
    console.log('print ~ UserService ~ getLogin ~ user:122', user);

    return user;
  }
  async delete(id: number) {
    return this.userRepository.delete(id);
  }
  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }
  async findOne(username: string) {
    let user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }
  async findAll() {
    let userList = await this.userRepository.find();
    return userList;
  }

  // 关联查询 user and profile
  async findUserWithProfile(id: number) {
    // let user = await this.userRepository.find({
    //   // where: { id: id },
    //   relations: {
    //     profile: true,
    //   },
    // });
    let user = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .getMany();
    return user;
  }

  // 关联查询 user and logs
  async findUserWithLogs(id: number) {
    // let user = await this.userRepository.find({
    //   where: { id: id },
    //   relations: {
    //     logs: true,
    //   },
    // });
    // let user = this.userRepository
    //   .createQueryBuilder('user')
    //   .addSelect('logs')
    //   .addSelect('user.id', 'userId')
    //   .addSelect('user.username', 'userName')
    //   .leftJoin('user.logs', 'logs')
    //   .getRawMany();
    let user = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.logs', 'logs')
      .getMany();
    return user;
  }

  // 查询 logs 数量Result
  async countUserLogs(id: number) {
    let countResult = this.logsRepository
      .createQueryBuilder('logs')
      .select('COUNT(logs.result)', 'count')
      .addSelect('logs.result', 'result')
      .where('logs.result IS NOT NULL')
      .andWhere("logs.result <> ''")
      .groupBy('logs.result')
      .getRawMany();
    // let countResult = this.logsRepository.query(
    //   'SELECT * FROM logs INNER JOIN  user ON logs.userId = user.id',
    // );

    return countResult;
  }
  async findUserWithProfileWithLogs(query: UserQuery) {
    let queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.logs', 'logs');

    let obj = {
      'profile.age': query.age,
      'logs.status': query.status,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
      }
    });

    return queryBuilder;
  }
}
