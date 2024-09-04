import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './user.entity';
import { UserService} from './user.service';
import { UsersController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    ],
    providers: [UserService, AuthService, JwtStrategy],
    controllers: [UsersController],
    exports: [UserService, AuthService, TypeOrmModule],
})
export class UserModule {}