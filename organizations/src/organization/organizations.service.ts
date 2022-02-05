

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { OrganizationsRepository } from "./organizations.repository";
import { OrganizationInputDTO } from "./graphdDTO/organization.input.dto";
import { Organization } from "./entity/organization.model";
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private organizationsRepository: OrganizationsRepository,
  ) {}
  async create(organizationInputDTO: OrganizationInputDTO) {
    let org = null;
    const { organizationName, organizationType } = organizationInputDTO;

    try {
      delete organizationInputDTO._id;
      let org = await this.organizationsRepository.create({
        organizationName,
        organizationType,
      });
      if (org) return { action: 'success' };
      else {
        action: 'failure';
      }
    } catch (error) {
      let index = error.message.indexOf('key:');
      return { action: 'error', message: error.message };
    }
  }

  async findAll(input: any) {
    let orgs = await this.organizationsRepository.findAll(input);
    return orgs;
  }

  async findOne(id: string): Promise<Organization> {
    return await this.organizationsRepository.findOne(
      new mongoose.Types.ObjectId(id),
    );
  }

  async delete(organizationInputDTO: OrganizationInputDTO) {
    try {
      const result = await this.organizationsRepository.delete(
        new mongoose.Types.ObjectId(organizationInputDTO._id),
      );
      // const resultAddress = await this.addressRepository.delete(organizationDTO.address);
      // if (result.n === 0 ) {
      //     throw new NotFoundException('Could not find Organization');
      // }
      return { action: 'success' };
    } catch (error) {
      let index = error.message.indexOf('key:');
      return { action: 'error', message: error.message.substring(index) };
    }
  }
  async update(organizationInputDTO: OrganizationInputDTO) {
    try {
      let updated = await this.organizationsRepository.update(
        organizationInputDTO,
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

