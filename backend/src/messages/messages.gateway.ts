import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './messages.service';
import { UserService } from '../users/user.service';

@WebSocketGateway({ namespace: 'messages', cors: true })
export class MessageGateway {
    @WebSocketServer()
    server: Server;
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService,

    ) { }

    @SubscribeMessage('createMessage')
    async handleMessage(
        @MessageBody('userId') userId: number,
        @MessageBody('content') content: string,
        @ConnectedSocket() client: Socket,
    ): Promise<void> {
        try {
        const user = await this.userService.findOne(userId);
        if (user) {
            const message = await this.messageService.create(user, content);
            this.server.emit('newMessage', message);
        } else {
            console.error('User not found');
        }

    }catch(error) {
            console.error('Error handling message:', error);
        }
    }
    @SubscribeMessage('findAllMessages')
    async handleFindAllMessages(client: Socket): Promise<void> {
        try {
            const messages = await this.messageService.findAll();
            client.emit('allMessages', messages);

        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }
}