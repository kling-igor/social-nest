import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';

import { CreateUserDTO } from '../user/create-user.dto';
import { UserDTO } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const found: UserDTO = await this.usersService.getUserByEmail(email);

    if (!found) throw new NotFoundException('Not found');

    const payload = { userId: found.id };
    return { token: this.jwtService.sign(payload) };
  }

  async signUp(user: CreateUserDTO) {
    const found: UserDTO = await this.usersService.getUserByEmail(user.email);

    if (found) throw new ConflictException('User exists');

    return await this.usersService.createUser(user);
  }
}
