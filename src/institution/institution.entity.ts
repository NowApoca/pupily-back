import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["name"])
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}