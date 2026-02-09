import { Logs } from 'src/logs/logs.entity';
import { Role } from 'src/role/role.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @ManyToMany(() => Role, (role) => role.user)
  role: Role[];
}
