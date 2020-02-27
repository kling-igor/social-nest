import { Exclude } from 'class-transformer';

// https://stackoverflow.com/questions/54778197/how-do-i-return-an-id-string-instead-of-a-bsontype-with-nestjs-serialization

export class UserDTO {
  @Exclude()
  readonly _id: string;

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
