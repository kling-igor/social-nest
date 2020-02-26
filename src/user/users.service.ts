import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateUserDTO } from './create-user.dto';
import { UserDTO } from './user.dto';

import { v4 as uuidv4 } from 'uuid';

const usersFakeCollection: UserDTO[] = [
  {
    id: '0',
    email: 'jd@example.com',
    password: 'pass',
    firstName: 'John',
    lastName: 'Dow',
  },
];

@Injectable()
export class UsersService {
  private readonly usersFakeCollection: UserDTO[];

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const found = this.usersFakeCollection.find(
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

    usersFakeCollection.push(newRecord);

    return newRecord;
  }

  async getUserById(id: string): Promise<UserDTO> {
    return await usersFakeCollection.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    return usersFakeCollection.find(user => user.email === email);
  }
}
