import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => User)
  @JoinTable()
  pupilies: User[];

  @ManyToMany(() => User)
  @JoinTable()
  sponsors: User[];
}