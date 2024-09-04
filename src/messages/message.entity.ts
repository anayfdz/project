import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @Column()
  timestamp: Date;
  @ManyToOne(() => User, user => user.messages)
  user: User;
}
