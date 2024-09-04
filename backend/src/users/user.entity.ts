import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Message } from '../messages/message.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;
    @Column()
    password: string;
    @OneToMany(() => Message, message => message.user)
    messages: Message[];
}