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

import {
  ApiBearerAuth,
  ApiSecurity,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { UserDTO } from './user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from './user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Got response successfully' })
  @ApiUnauthorizedResponse({ description: 'Missing Bearer token' })
  async getProfile(@CurrentUser('userId') userId: string): Promise<UserDTO> {
    return await this.usersService.getUserById(userId);
  }
}
