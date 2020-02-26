import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UsersService } from '../user/users.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    UsersService /* it is odd to add this here in explicit way, why it shouldn't be imported from UserModule as the last is in imports section ? */,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
