import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User} from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}
    async create(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ username, password: hashedPassword});
        return this.userRepository.save(user);
    }
    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id}})
    }
    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username}})
    }
    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.findByUsername(username);
        if(user && await bcrypt.compare(password, user.password)) {
            return user;
        }
    }
}