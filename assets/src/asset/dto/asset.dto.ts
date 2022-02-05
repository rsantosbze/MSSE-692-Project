import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { OrganizationDTO} from './organization.dto';
import { UserDTO } from './user.dto';


@ObjectType()
@Directive('@key(fields: "_id")')
export class AssetDTO {
  @Field((type) => ID)
  readonly _id: string;
  @Field()
  readonly assetName: string;
  @Field()
  readonly assetCode: string;
  @Field()
  readonly assetDescription: string;
  @Field()
  readonly dateOfManufacture: Date;
  @Field()
  readonly dateOfInstallation: Date;

  @Field((type) => UserDTO)
  userDTO: UserDTO;

  @Field()
  userId: string;

  @Field((type) => OrganizationDTO)
  facilityDTO: OrganizationDTO;

  @Field()
  facilityId: string;

  @Field((type) => OrganizationDTO)
  supplierDTO: OrganizationDTO;

  @Field()
  supplierId: string;

  // @Field(() => OrganizationResponseDTO)
  // readonly supplier: [OrganizationResponseDTO];
  // @Field(() => OrganizationResponseDTO)
  // readonly facility: [OrganizationResponseDTO];
  // @Field(() => [MaintenanceRecordResponseDTO])
  // readonly maintenanceRecords: [MaintenanceRecordResponseDTO];
}


