import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateUserDTO } from './create-user.dto';
import { UserDTO } from './user.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly USER_FAKE_COLLECTION: UserDTO[] = [
    {
      id: '0',
      email: 'jd@example.com',
      password: 'pass',
      firstName: 'John',
      lastName: 'Dow',
    },
  ];

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const found = this.USER_FAKE_COLLECTION.find(
      ({ email }) => email === createUserDTO.email,
    );

    if (found) {
      throw new ConflictException('Already exists');
    }

    const newRecord: UserDTO = {
      id: uuidv4(),
      email: createUserDTO.email,
      password: createUserDTO.password,
      firstName: createUserDTO.firstName,
      lastName: createUserDTO.lastName,
    };

    this.USER_FAKE_COLLECTION.push(newRecord);

    return newRecord;
  }

  async getUserById(id: string): Promise<UserDTO> {
    return await this.USER_FAKE_COLLECTION.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    return this.USER_FAKE_COLLECTION.find(user => user.email === email);
  }
}
