import {
  // ValidationPipe,
  UsePipes,
  Controller,
  Get,
  Res,
  HttpStatus,
  HttpCode,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/create-user.dto';
import { ValidationPipe } from '../validation-pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body('email') email, @Body('password') password): Promise<any> {
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    return this.authService.signUp(createUserDTO);
  }
}
