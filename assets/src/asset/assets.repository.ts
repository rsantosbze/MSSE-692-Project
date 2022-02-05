
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { Asset } from './entity/asset.model';
export class AssetsRepository {
  constructor(@InjectModel('Asset') private readonly model: Model<Asset>) {}
  async create(input: any) {
    try {
      let asset = await new this.model(input).save();
      return asset;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // private async addOrganizationF(_Id: mongoose.Types.ObjectId, _orgId: any) {
  //   return this.model.findByIdAndUpdate(
  //     _Id,
  //     { facility: _orgId },
  //     { new: true, useFindAndModify: false },
  //   );
  // }
  // private async addOrganizationS(_Id: mongoose.Types.ObjectId, _orgId: any) {
  //   return this.model.findByIdAndUpdate(
  //     _Id,
  //     { supplier: _orgId },
  //     { new: true, useFindAndModify: false },
  //   );
  // }

  // async addMaintenanceRecord(
  //   { _id }: any,
  //   _maintenanceRecordId: mongoose.Types.ObjectId,
  // ) {
  //   console.log('id informaton' + _id);
  //   return this.model.findByIdAndUpdate(
  //     _id,
  //     { $push: { maintenanceRecords: _maintenanceRecordId } },
  //     { new: true, useFindAndModify: false },
  //   );
  // }

  async findAll() {
    try {
      return await this.model.find().exec();
      // return await this.model
      //   .find()
      //   .populate('supplier')
      //   .populate('facility');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(_id: mongoose.Types.ObjectId) {
    return await this.model.deleteOne({ _id }).exec();
  }

  // async deleteMaintenanceRecord(
  //   { _id }: any,
  //   _maintenanceRecordId: mongoose.Types.ObjectId,
  // ) {
  //   return await this.model.findByIdAndUpdate(
  //     _id,
  //     { $pull: { maintenanceRecords: { $in: _maintenanceRecordId } } },
  //     { new: true, useFindAndModify: false },
  //   );
  // }

  async update(updated: any) {
    try {
      let updatedAsset = await this.model.findByIdAndUpdate(
        updated._id,
        updated,
        { new: true, useFindAndModify: false },
      );
      return updatedAsset;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOne(id: mongoose.Types.ObjectId): Promise<Asset> {
    try {
      const result = this.model.findById(id);
      if (!result) throw new NotFoundException('Could not find document');
      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }

  public async findUser(id: string): Promise<Asset[]> {
    try {
      const result = this.model.find({ userId: id });

      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }
  public async findFacility(id: string): Promise<Asset[]> {
    try {
      const result = this.model.find({ facilityId: id });

      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }
  public async findSupplier(id: string): Promise<Asset[]> {
    try {
      const result = this.model.find({ supplierId: id });

      return result;
    } catch (error) {
      throw new NotFoundException('Could not find document');
    }
  }
}
