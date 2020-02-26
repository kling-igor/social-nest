import {
  Controller,
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
} from '@nestjs/common';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  @Get('/me')
  async getProfile(): Promise<UserDTO> {
    return { firstName: 'John', lastName: 'Dow' };
  }
}
