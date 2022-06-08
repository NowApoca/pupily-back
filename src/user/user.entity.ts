import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserType } from './interfaces';

@Entity()
@Unique(["userName"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  type: UserType;
}