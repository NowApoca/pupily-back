import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["projectName"])
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;
}