import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './create-user.dto';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  // private readonly USER_FAKE_COLLECTION: UserEntity[] = [
  //   new UserEntity({
  //     id: uuidv4(),
  //     email: 'jd@example.com',
  //     password: 'pass',
  //     firstName: 'John',
  //     lastName: 'Dow',
  //   }),
  // ];

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<UserDTO> {
    const createdUser = new this.userModel({ id: uuidv4(), ...createUserDto });
    const user = await createdUser.save();

    return new UserDTO(
      user.toObject({
        versionKey: false,
        flattenMaps: true,
      }),
    );

    // const found = this.USER_FAKE_COLLECTION.find(
    //   ({ email }) => email === createUserDTO.email,
    // );

    // if (found) {
    //   throw new ConflictException('Already exists');
    // }

    // const { email, password, firstName, lastName } = createUserDTO;

    // const newRecord: UserEntity = new UserEntity({
    //   id: uuidv4(),
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });

    // this.USER_FAKE_COLLECTION.push(newRecord);

    // return newRecord;
  }

  async getUserById(id: string): Promise<UserDTO> {
    // return await this.USER_FAKE_COLLECTION.find(user => user.id === id);

    const user: UserEntity = await this.userModel.findOne({ id }).exec();

    return new UserDTO(
      user.toObject({
        versionKey: false,
        flattenMaps: true,
      }),
    );
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    // return this.USER_FAKE_COLLECTION.find(user => user.email === email);

    const user: UserEntity = await this.userModel.findOne({ email }).exec();

    return new UserDTO(
      user.toObject({
        versionKey: false,
        flattenMaps: true,
      }),
    );
  }
}
