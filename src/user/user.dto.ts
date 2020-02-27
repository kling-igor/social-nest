import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
// https://stackoverflow.com/questions/54778197/how-do-i-return-an-id-string-instead-of-a-bsontype-with-nestjs-serialization

export class UserDTO {
  @Exclude()
  readonly _id: string;

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @Exclude()
  readonly password?: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
