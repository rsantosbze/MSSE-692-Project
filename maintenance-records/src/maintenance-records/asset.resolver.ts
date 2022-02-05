import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MaintenanceRecordDTO } from './dto/maintenance-record.dto';
import { AssetDTO } from './dto/asset.dto';

import { MaintenanceRecordService } from './maintenance-record.service';
import { MaintenanceRecord } from './entity/maintenance-record.model';



@Resolver((of) => AssetDTO)
export class AssetResolver {
  constructor(private readonly maintenanceRecordService: MaintenanceRecordService) {}

  @ResolveField((of) => [MaintenanceRecordDTO])
  maintenanceRecords(@Parent() asset: AssetDTO): Promise<MaintenanceRecord[]> {
      console.log('resolving maintenanceRecords', asset._id);
    return this.maintenanceRecordService.forEntity(asset._id);
  }
}
