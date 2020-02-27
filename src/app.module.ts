import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_HOST'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [UsersService],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
