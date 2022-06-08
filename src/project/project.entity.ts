import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';

@Entity()
@Unique(["name"])
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(user => User)
  user: User;

  @Column()
  name: string;
}