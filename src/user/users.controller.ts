import {
  UseGuards,
  Controller,
  Request,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { CurrentUser } from './user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser('userId') userId: string): Promise<UserEntity> {
    return await this.usersService.getUserById(userId);
  }
}
