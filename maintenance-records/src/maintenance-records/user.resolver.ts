import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MaintenanceRecordDTO } from './dto/maintenance-record.dto';
import { AssetDTO } from './dto/asset.dto';

import { MaintenanceRecordService } from './maintenance-record.service';
import { MaintenanceRecord } from './entity/maintenance-record.model';
import { UserDTO } from './dto/user.dto';



@Resolver((of) => AssetDTO)
export class UserResolver {
  constructor(private readonly maintenanceRecordService: MaintenanceRecordService) {}

  @ResolveField((of) => [MaintenanceRecordDTO])
  maintenanceRecords(@Parent() user: UserDTO): Promise<MaintenanceRecord[]> {
    return this.maintenanceRecordService.forEntity(user._id);
  }
}
