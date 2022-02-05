
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { Organization } from './entity/organization.model';
export class OrganizationsRepository {
    constructor(@InjectModel('Organization') private readonly model: Model<Organization>) {}
    async create(input: any) {
        try {
            return await new this.model(input).save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    // async addUserToOrganization({ _id }: any, _userId: mongoose.Types.ObjectId) {
    //     return this.model.findByIdAndUpdate(_id, { $push: { users: _userId } }, { new: true, useFindAndModify: false });
    // }

    // async addAssetToOrganization({ _id }: any, _assetId: MongooseSchema.Types.ObjectId) {
    //     return this.model.findByIdAndUpdate(_id, { $push: { assets: _assetId } }, { new: true, useFindAndModify: false });
    // }

    // async addAddressToOrganization(_Id: mongoose.Types.ObjectId, _addressId: any) {
    //     return this.model.findByIdAndUpdate(_Id, { address: _addressId }, { new: true, useFindAndModify: false });
    // }

    async findAll(input: any) {
        try {
            return await this.model.find(input).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async delete(_id: mongoose.Types.ObjectId) {
        return await this.model.deleteOne({ _id }).exec();
    }

    // async deleteAsset({ _id }: any, _assetId: mongoose.Types.ObjectId) {
    //     return await this.model.findByIdAndUpdate(
    //         _id,
    //         { $pull: { assets: { $in: _assetId } } },
    //         { new: true, useFindAndModify: false },
    //     );
    // }

    // async deleteUser({ _id }: any, _userId: mongoose.Types.ObjectId) {
    //     return await this.model.findByIdAndUpdate(
    //         _id,
    //         { $pull: { users: { $in: _userId } } },
    //         { new: true, useFindAndModify: false },
    //     );
    // }

    async update(updated: any) {
        try {
            return await this.model.findByIdAndUpdate(updated._id, updated, { new: true, useFindAndModify: false });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async findOne(id: mongoose.Types.ObjectId): Promise<Organization> {
        try {
            const result = this.model.findById( id );
            if (!result) throw new NotFoundException('Could not find document');
            return result;
        } catch (error) {
            throw new NotFoundException('Could not find document');
        }
    }
}
