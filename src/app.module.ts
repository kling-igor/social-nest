import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UsersService } from './user/users.service';

@Module({
  imports: [UserModule],
  providers: [UsersService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
