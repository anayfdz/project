import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from '../messages/messages.service';
  import { UserService } from '../users/user.service';
  
  @WebSocketGateway()
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private readonly messageService: MessageService,
      private readonly userService: UserService,
    ) {}
  
    handleConnection(client: Socket) {
      console.log(`Client connected ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected ${client.id}`);
    }
  
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody() message: { userId: string; content: string },
      @ConnectedSocket() client: Socket,
    ) {
      try {
        const userId = parseInt(message.userId, 10);
        if (isNaN(userId)) {
            throw new Error('Invalid userId');
        }
        const user = await this.userService.findOne(userId);
        if (user) {
            const savedMessage = await this.messageService.create(user, message.content);
            this.server.emit('newMessage', savedMessage);
        } else {
            console.error('User not found');
        }
      } catch (err) {
        console.log('Error handling message:', err);
      }
    }
  }
  