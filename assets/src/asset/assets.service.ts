// import { MaintenanceRecordsRepository } from './../../repositories/maintenance-record.repository';
// import { OrganizationsRepository } from './../../repositories/organizations.repository';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AssetsRepository } from './assets.repository';
import { AssetInputDTO } from './graphDTO/asset.input.dto';
import { Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AssetsService {
  constructor(
    //  @Inject(forwardRef(() => MaintenanceRecordsRepository))
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private assetsRepository: AssetsRepository, //  private maintenanceRecordRepository: MaintenanceRecordsRepository, // private organizationsRepository: OrganizationsRepository,
  ) {}
  async create(assetInputDTO: AssetInputDTO) {
    try {
      delete assetInputDTO._id;

      let asset = await this.assetsRepository.create(assetInputDTO);
      if (asset) return { action: 'success' };
    } catch (error) {
      console.log(error.response.response);
      // let index = error.message.indexOf('key:');
      return {
        action: 'error',
        message: error.message,
        statusCode: error.response.response.statusCode,
      };
    }
  }

  async findAll() {
    return await this.assetsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.assetsRepository.findOne(new mongoose.Types.ObjectId(id));
  }

  async delete(assetInputDTO: AssetInputDTO) {
    try {
      const { _id } = assetInputDTO;
      const result = await this.assetsRepository.delete(
        new mongoose.Types.ObjectId(_id),
      );
      return { action: 'success' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return { action: 'error', message: error.message.substring(index) };
    }
  }

  async update(assetInputDTO: AssetInputDTO) {
    try {
      let updated = await this.assetsRepository.update(assetInputDTO);
      if (updated) return { action: 'success' };
    } catch (error) {
      return { action: 'error', message: error.message };
    }
  }

  async forUser(id: string) {
    return await this.assetsRepository.findUser(id);
  }

  async forFacility(id: string) {
    return await this.assetsRepository.findFacility(id);
  }

  async forSupplier(id: string) {
    return await this.assetsRepository.findSupplier(id);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = this.client.send({ cmd: 'validate-user' }, payload);

    return user;
  }

  // async getHelloAsync() {
  //   const message = await this.client.send(
  //     { cmd: 'greeting-async' },
  //     'Progressive Coder ASSET',
  //   );

  //   this.client.emit<string>('test', 'Hello big fucker');
  //   return message;
  // }
}
