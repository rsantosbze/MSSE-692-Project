
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MaintenanceRecordService } from './maintenance-record.service';
import { Schema as MongooseSchema } from 'mongoose';
import { ResponseMDTO } from "./dto/response.dto";
import { MaintenanceRecordInputDTO } from "./graphDTO/maintenance-record.input.dto";
import { MaintenanceRecordDTO } from "./dto/maintenance-record.dto";
import { AssetDTO } from './dto/asset.dto';
import { UserDTO } from './dto/user.dto';


@Resolver((of) => MaintenanceRecordDTO)
export class MaintenanceRecordResolver {
  constructor(
    private readonly maintenanceRecordService: MaintenanceRecordService,
  ) {}

  @Query(() => [MaintenanceRecordDTO])
  async findAllMaintenanceRecords() {
    return this.maintenanceRecordService.findAll();
  }

  @Mutation(() => ResponseMDTO)
  async createMaintenanceRecord(
    @Args('input') input: MaintenanceRecordInputDTO,
  ) {
    return this.maintenanceRecordService.create(input);
  }
  @Mutation(() => ResponseMDTO)
  async deleteMaintenanceRecord(
    @Args('input') input: MaintenanceRecordInputDTO,
  ) {
    return this.maintenanceRecordService.delete(input);
  }
  @Mutation(() => ResponseMDTO)
  async updateMaintenanceRecord(
    @Args('input') input: MaintenanceRecordInputDTO,
  ) {
    return this.maintenanceRecordService.update(input);
  }

  @ResolveField((of) => AssetDTO)
  asset(@Parent() maintenanceRecord: MaintenanceRecordDTO) {
    return { __typename: 'AssetDTO', _id: maintenanceRecord.assetId };
  }

  @ResolveField((of) => UserDTO)
  user(@Parent() maintenanceRecord: MaintenanceRecordDTO) {
    return { __typename: 'UserDTO', _id: maintenanceRecord.userId };
  }
}
