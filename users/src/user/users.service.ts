// import { OrganizationsRepository } from './../../repositories/organizations.repository';

import { Injectable, NotFoundException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { User } from './entity/user.model';
import { UsersRepository } from './users.repository';
// import * as bcrypt from 'bcryptjs';
import { Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserInputDTO } from './graphDTO/user.input.dto';

//import { AddressRepository } from '../../repositories/address.respository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(userInputDTO: UserInputDTO) {
    try {
      const { password } = userInputDTO;
      delete userInputDTO._id;
      let usr = this.usersRepository.create(userInputDTO);
      if (usr) return { action: 'success', message: 'User Created' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return {
        action: 'error',
        message: 'Duplicate ' + error.message.substring(index),
      };
    }
  }
  async register({ username, password, email, organizationId }: any) {
    try {
      let userInputDTO: UserInputDTO = {
        _id: '',
        username,
        email,
        password,
        organizationId,
        firstName: '',
        lastName: '',
        role: 'USER',
        status: true,
      };

      let user = await this.create({ ...userInputDTO });
      if (user) return { action: 'success', message: 'User Registered' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return {
        action: 'error',
        message: 'Duplicate ' + error.message.substring(index),
      };
    }
  }
  async findByPayload({ username }: any): Promise<User> {
    return await this.usersRepository.findByUsername(username);
  }

  async findByLogin({ username }: any): Promise<User> {
    return await this.usersRepository.findByUsername(username);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(new mongoose.Types.ObjectId(id));
  }

  async delete(userInputDTO: UserInputDTO) {
    try {
      const { _id } = userInputDTO;
      const result = await this.usersRepository.delete(
        new mongoose.Types.ObjectId(_id),
      );

      return { action: 'success', message: 'User Deleted' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return { action: 'error', message: error.message.substring(index) };
    }
  }
  async forOrganization(id: string) {
    return await this.usersRepository.find(id);
  }

  async update(userInputDTO: UserInputDTO) {
    try {
      let updated = await this.usersRepository.update(userInputDTO);
      if (updated) return { action: 'success' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return {
        action: 'error',
        message: 'Duplicate ' + error.message.substring(index),
      };
    }
  }
}
