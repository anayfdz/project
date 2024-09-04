import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service'
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService, private readonly authService: AuthService, ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
    await this.usersService.create(createUserDto);
    return { message: 'User registered successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
