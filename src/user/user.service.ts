import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    let user = await this.userRepository.find({
      where: { id: id },
      relations: {
        logs: true,
      },
    });
    return user;
  }
}
