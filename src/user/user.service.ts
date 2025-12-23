import { Logs } from './../logs/logs.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Logs) private logsRepository: Repository<Logs>,
  ) {}

  async create(user: User) {
    const tmpUser = this.userRepository.create(user);
    let newUser = await this.userRepository.save(tmpUser);
    return newUser;
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
}
