import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateUserDTO } from './create-user.dto';
import { UserEntity } from './user.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly USER_FAKE_COLLECTION: UserEntity[] = [
    new UserEntity({
      id: uuidv4(),
      email: 'jd@example.com',
      password: 'pass',
      firstName: 'John',
      lastName: 'Dow',
    }),
  ];

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const found = this.USER_FAKE_COLLECTION.find(
      ({ email }) => email === createUserDTO.email,
    );

    if (found) {
      throw new ConflictException('Already exists');
    }

    const { email, password, firstName, lastName } = createUserDTO;

    const newRecord: UserEntity = new UserEntity({
      id: uuidv4(),
      email,
      password,
      firstName,
      lastName,
    });

    this.USER_FAKE_COLLECTION.push(newRecord);

    return newRecord;
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.USER_FAKE_COLLECTION.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.USER_FAKE_COLLECTION.find(user => user.email === email);
  }
}
