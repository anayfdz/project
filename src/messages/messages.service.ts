import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from './message.entity';
import { User} from '../users/user.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(User) 
        private userRepository: Repository<User>,
    ) {}
    async create(content: string, userId: number): Promise<Message> {
        const user = await this.userRepository.findOneBy({ id: userId});
        if(!user) {
            throw new NotFoundException('User not found');
        }
        const message = this.messageRepository.create({ content, user});
        return this.messageRepository.save(message);
    }
    async findAll(): Promise<Message[]> {
        return this.messageRepository.find({relations: ['user']})
    }
    async findByUser(userId: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: { user: { id: userId}},
            relations: ['user']
        })
    }
}