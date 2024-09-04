import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageService } from './messages.service';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: Repository<Message>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: {
            create: jest.fn().mockImplementation((message) => message),
            save: jest.fn().mockResolvedValue({ content: 'Test content', user: { id: 1 } }),
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue(new User()),
        },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(new User()),
          },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    messageRepository = module.get<Repository<Message>>(getRepositoryToken(Message));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a message', async () => {
      const user = new User();
      user.id = 1;
      const result = await service.create(user, 'Test content');
      expect(result).toEqual({ content: 'Test content', user:  { id: 1 }});
      expect(messageRepository.create).toHaveBeenCalledWith({ content: 'Test content', user });
      expect(messageRepository.save).toHaveBeenCalledWith({ content: 'Test content', user });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
      const user = new User();
      user.id = 1;

      await expect(service.create(user, 'Test content'))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(messageRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByUser', () => {
    it('should return an array of messages for a user', async () => {
      const result = await service.findByUser(1);
      expect(result).toEqual([]);
      expect(messageRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
        relations: ['user'],
      });
    });
  });
});
