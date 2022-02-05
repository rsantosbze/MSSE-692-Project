import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { AssetDTO } from './asset.dto';
import { UserDTO } from './user.dto';



@ObjectType()
@Directive('@key(fields: "_id")')
export class MaintenanceRecordDTO {
  @Field()
  _id: string;
  @Field()
  readonly maintenanceDescription: string;
  @Field()
  readonly dateOfMaintenance: Date;

  @Field((type) => AssetDTO)
  asset: AssetDTO;

  @Field()
  assetId: string;

  @Field((type) => UserDTO)
  user: UserDTO;

  @Field()
  userId: string;
}