
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { MaintenanceRecord } from './entity/maintenance-record.model';

export class MaintenanceRecordsRepository {
  constructor(
    @InjectModel('MaintenanceRecord')
    private readonly model: Model<MaintenanceRecord>,
  ) {}
  async create(input: any) {
    try {
      let maintRecord = await new this.model(input).save();
      return maintRecord;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  // private async addUser(_Id: mongoose.Types.ObjectId, Id: any) {
  //   return this.model.findByIdAndUpdate(
  //     _Id,
  //     { user: Id },
  //     { new: true, useFindAndModify: false },
  //   );
  // }
  // private async addAsset(_Id: mongoose.Types.ObjectId, Id: any) {
  //   return this.model.findByIdAndUpdate(
  //     _Id,
  //     { asset: Id },
  //     { new: true, useFindAndModify: false },
  //   );
  // }

  async findAll() {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMany(_id: any) {
    return await this.model.deleteMany({ asset: _id }).exec();
  }
  async delete(_id: mongoose.Types.ObjectId) {
    return await this.model.deleteOne({ _id }).exec();
  }

  async update(updated: any) {
    try {
      let updatedRecord = await this.model.findByIdAndUpdate(
        updated._id,
        updated,
        { new: true, useFindAndModify: false },
      )
      return updatedRecord;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async find(id: string): Promise<MaintenanceRecord[]> {
    try {
      const result = this.model.find({ assetId: id });

      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }
}
