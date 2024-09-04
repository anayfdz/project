import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateway } from './messages.gateway';
import { MessageService } from './messages.service';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { Server } from 'socket.io';
import * as http from 'http';
import * as io from 'socket.io-client';

describe('MessageGateway', () => {
  let gateway: MessageGateway;
  let server: http.Server;
  let ioServer: Server;
  let socketClient: io.Socket;

  beforeAll((done) => {
    // Set up the testing module
    Test.createTestingModule({
      providers: [MessageGateway, MessageService, UserService, JwtService],
    })
    .compile()
    .then((module: TestingModule) => {
      gateway = module.get<MessageGateway>(MessageGateway);

      // Create an HTTP server and a Socket.io server
      server = http.createServer();
      ioServer = new Server(server);

      ioServer.on('connection', (socket) => {
        // Handle WebSocket events
        socket.on('createMessage', (data) => gateway.handleMessage(data.userId, data.content, socket));
        socket.on('findAllMessages', () => gateway.handleFindAllMessages(socket));
      });

      server.listen(3000, () => {
        // Connect to the WebSocket server
        socketClient = io.connect('http://localhost:3000/messages');
        done();
      });
    });
  });

  afterAll(() => {
    server.close();
    socketClient.disconnect();
  });

  it('should create and return a message', (done) => {
    socketClient.emit('createMessage', { userId: 1, content: 'Test message' });

    socketClient.on('newMessage', (message) => {
      expect(message).toHaveProperty('content', 'Test message');
      done();
    });
  });

  it('should return all messages', (done) => {
    socketClient.emit('findAllMessages');

    socketClient.on('allMessages', (messages) => {
      expect(Array.isArray(messages)).toBe(true);
      done();
    });
  });
});
