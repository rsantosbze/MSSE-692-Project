import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { MaintenanceRecordDTO } from './maintenance-record.dto';



@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class AssetDTO {
  @Field((type) => ID)
  @Directive('@external')
  _id: string;

  @Field((type) => [MaintenanceRecordDTO])
  maintenanceRecords: MaintenanceRecordDTO[];
}






