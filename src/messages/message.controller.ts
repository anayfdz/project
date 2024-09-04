import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  async create(@Body() body: { userId: number; content: string }): Promise<Message> {
    return this.messageService.create(body.userId, body.content);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
