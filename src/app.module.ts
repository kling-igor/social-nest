import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UsersService } from './user/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [UsersService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
