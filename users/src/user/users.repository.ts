import { UserInputDTO } from './graphDTO/user.input.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema} from 'mongoose';
import { User } from './entity/user.model';
import * as mongoose from 'mongoose';


export class UsersRepository {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async create(input: any) {
    try {
      let user = await this.model.create(input);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  // async addAddressToUser(_Id: mongoose.Types.ObjectId, _addressId: any) {
  //   try {
  //     return this.model.findByIdAndUpdate(
  //       _Id,
  //       { address: _addressId },
  //       { new: true, useFindAndModify: false },
  //     );
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  async findAll() {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(_id: mongoose.Types.ObjectId) {
    return await this.model.deleteOne({ _id }).exec();
  }

  async update(updated: any) {
    delete updated.password;
    try {
      return await this.model.findByIdAndUpdate(updated._id, updated, {
        new: true,
        useFindAndModify: false,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOne(_id: mongoose.Types.ObjectId): Promise<User> {
    try {
      const result = await this.model.findById(_id);
      if (!result) throw new NotFoundException('Could not find document');
      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }

  public async findByUsername(username: string): Promise<User> {
    try {
      return await this.model.findOne({ username: username }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async find(id: string): Promise<User[]> {
    try {
      const result = this.model.find({ organizationId: id });

      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }
}
