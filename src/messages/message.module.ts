import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message} from './message.entity';
import { MessageService} from './messages.service';
import { MessageGateway} from './messages.gateway';
import { UserModule} from '../users/user.module';
import { MessageController } from './message.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([Message]),
      UserModule,
    ],
    controllers: [MessageController],
    providers: [
      MessageService,
      MessageGateway,
    ],
    exports: [MessageService],
  })

export class MessageModule {}