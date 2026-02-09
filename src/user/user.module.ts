import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from 'src/logs/logs.entity';
import { Profile } from './profile.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Logs, Profile])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
