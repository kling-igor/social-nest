import {
  // ValidationPipe,
  UseGuards,
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

import {
  ApiOperation,
  ApiBody,
  ApiBasicAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBasicAuth()
  @ApiOkResponse({ description: 'Signed in successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @ApiBadRequestResponse({ description: 'Missing credentials' })
  @ApiBody({ type: CreateUserDTO })
  async signIn(@Body('email') email, @Body('password') password): Promise<any> {
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user account' })
  @ApiCreatedResponse({
    description: 'The User record has been successfully created.',
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiBadRequestResponse({ description: 'Missing credentials' })
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    return this.authService.signUp(createUserDTO);
  }
}
