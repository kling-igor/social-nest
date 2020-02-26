import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateUserDTO } from './create-user.dto';
import { UserDTO } from './user.dto';

import { v4 as uuidv4 } from 'uuid';

const usersFakeCollection = [];

@Injectable()
export class UsersService {
  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const found = usersFakeCollection.find(
      ({ email }) => email === createUserDTO.email,
    );

    if (found) {
      throw new ConflictException('Already exists');
    }

    const newRecord: UserDTO = {
      id: uuidv4(),
      email: createUserDTO.email,
      firstName: createUserDTO.firstName,
      lastName: createUserDTO.lastName,
    };

    usersFakeCollection.push(newRecord);

    console.log(usersFakeCollection);

    return newRecord;
  }

  async getUserById(id: string): Promise<UserDTO> {
    return usersFakeCollection.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    return usersFakeCollection.find(user => user.email === email);
  }
}
