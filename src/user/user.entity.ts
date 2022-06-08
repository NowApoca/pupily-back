import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserType } from './interfaces';

@Entity()
@Unique(["name"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  type: UserType;
}