import { IsString, IsEmail } from 'class-validator';
export class CreateUserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}
