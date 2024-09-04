import { WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { MessageService} from './messages.service';
import { UserService} from '../users/user.service';

@WebSocketGateway({ namespace: 'messages'})
export class MessageGateway {
    @WebSocketServer()
    server: Server;
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService,
    
    ) {}

    @SubscribeMessage('createMessage')
    async handleMessage(
        @MessageBody('content') content: string,
        @MessageBody('userId') userId: number,
        @ConnectedSocket() client: Socket,
    ): Promise<void> {
        const user = await this.userService.findOne(userId);
        if(user) {
            const message = await this.messageService.create(content, user);
            this.server.emit('newMessage', message);
        }
    }
    @SubscribeMessage('findAllMessages')
    async handleFindAllMessages(client: Socket): Promise<void> {
        const messages = await this.messageService.findAll();
        client.emit('allMessages', messages);
    }
}