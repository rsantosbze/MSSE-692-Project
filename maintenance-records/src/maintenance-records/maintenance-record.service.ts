
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MaintenanceRecordInputDTO } from './graphDTO/maintenance-record.input.dto';
import * as mongoose from 'mongoose';
import { MaintenanceRecordsRepository } from "./maintenance-record.repository";
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from "./interfaces/payload.interface";


@Injectable()
export class MaintenanceRecordService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private maintenanceRecordRepository: MaintenanceRecordsRepository,
  ) {}
  async create(maintenanceRecordInputDTO: MaintenanceRecordInputDTO) {
    try {
      delete maintenanceRecordInputDTO._id;
      let maintRecord = await this.maintenanceRecordRepository.create(
        maintenanceRecordInputDTO,
      );
      if (maintRecord) return { action: 'success' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return { action: 'error', message: error.message };
    }
  }

  async findAll() {
    let orgs = await this.maintenanceRecordRepository.findAll();
    return orgs;
  }
  async delete(maintenanceRecordDTO: MaintenanceRecordInputDTO) {
    try {
      const { _id } = maintenanceRecordDTO;
      const result = await this.maintenanceRecordRepository.delete(new mongoose.Types.ObjectId(_id));
      return { action: 'success', message:'Record Deleted' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return { action: 'error', message: error.message.substring(index) };
    }
  }

  async forEntity(id: string) {
    return await this.maintenanceRecordRepository.find(id);
  }

  async update(maintenanceRecordDTO: MaintenanceRecordInputDTO) {
    try {
      let updated = await this.maintenanceRecordRepository.update(
        maintenanceRecordDTO,
      );
      if (updated) return { action: 'success' };
    } catch (error) {
      return { action: 'error', message: error.message };
    }
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    const user = this.client.send({ cmd: 'validate-user' }, payload);
    return user;
  }
}

