
import { ObjectType, Field, InputType } from '@nestjs/graphql';
// import { AddressDTO } from '../../address/graphDTO/address.dto';

@InputType()
export class AssetInputDTO {
  @Field({ nullable: true })
  _id: string;
  @Field()
  readonly assetCode: string;
  @Field()
  readonly assetName: string;
  @Field()
  readonly assetDescription: string;
  @Field()
  readonly dateOfManufacture?: Date;
  @Field()
  readonly dateOfInstallation?: Date;
  @Field()
  readonly userId: string;
  @Field()
  readonly facilityId: string;
  @Field()
  readonly supplierId: string;
  //   @Field(() => SupplierDTO)
  //   readonly supplier: [SupplierDTO];
  //   @Field(() => FacilityDTO)
  //   readonly facility: [FacilityDTO];
}
// @InputType()
// export class SupplierDTO {
//   @Field()
//   _id: string;
// }
// @InputType()
// export class FacilityDTO {
//   @Field()
//   _id: string;
// }
