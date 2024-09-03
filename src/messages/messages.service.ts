import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from './message.entity';
import { User} from '../users/user.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) {}
    async create(content: string, user: User): Promise<Message> {
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