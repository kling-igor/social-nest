import { Document } from 'mongoose';

// https://stackoverflow.com/questions/54778197/how-do-i-return-an-id-string-instead-of-a-bsontype-with-nestjs-serialization

export class UserEntity extends Document {
  readonly id: string;

  readonly email: string;

  readonly password?: string;

  readonly firstName: string;

  readonly lastName: string;
}
