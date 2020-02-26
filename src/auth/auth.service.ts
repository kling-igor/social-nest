import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';

import { CreateUserDTO } from '../user/create-user.dto';
import { UserDTO } from '../user/user.dto';
import { SignedInUserDTO } from '../user/signedin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    // TODO: should compare password hashes!!!
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(email: string, password: string): Promise<SignedInUserDTO> {
    const user: UserDTO = await this.validateUser(email, password);

    if (!user) throw new NotFoundException('Not found');

    const payload = { userId: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  async signUp(user: CreateUserDTO) {
    const found: UserDTO = await this.usersService.getUserByEmail(user.email);

    if (found) throw new ConflictException('User exists');

    return await this.usersService.createUser(user);
  }
}
