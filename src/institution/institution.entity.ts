import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["institutionName"])
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institutionName: string;
}