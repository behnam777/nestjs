import BaseEntity from './base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  name: string;

  
  @Column()
  duration: number;

}
