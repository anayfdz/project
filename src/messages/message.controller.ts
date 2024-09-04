import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { MessageService } from './messages.service';
import { UserService } from '../users/user.service';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService, private readonly userService: UserService) {}

  @Post()
  async createMessage(
    @Body() body: { userId: number; content: string },
  ): Promise<Message> {
    const user: User = await this.userService.findOne(body.userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.messageService.create(user, body.content);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
