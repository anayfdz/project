import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message} from './message.entity';
import { MessageService} from './messages.service';
import { MessageGateway} from './messages.gateway';
import { UserModule} from '../users/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), UserModule],
    providers: [MessageService, MessageGateway],
    exports: [MessageService]
})
export class MessageModule {}