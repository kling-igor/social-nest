import { Exclude } from 'class-transformer';

export class UserDTO {
  readonly id: string;

  readonly email: string;

  @Exclude()
  readonly password?: string;

  readonly firstName: string;

  readonly lastName: string;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
