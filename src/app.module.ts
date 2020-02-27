import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UsersService } from './user/users.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // envFilePath: '.development.env',
      // ignoreEnvFile: true, // this ignores file and relies on environment variables from the runtime environment
    }),
    UserModule,
    AuthModule,
  ],
  providers: [UsersService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
