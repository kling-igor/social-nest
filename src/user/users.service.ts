import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';

let usersFakeCollection = [];

@Injectable()
export class UsersService {
  async createUser(createUserDTO: CreateUserDTO): Promise<any> {
    return;
  }

  async getUserById(id: string): Promise<any> {
    return { firstName: 'John', lastName: 'Dow' };
  }
}
