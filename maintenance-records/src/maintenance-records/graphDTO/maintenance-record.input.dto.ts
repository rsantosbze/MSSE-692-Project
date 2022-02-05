import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MaintenanceRecordInputDTO {
  @Field({ nullable: true })
  _id: string;
  @Field()
  readonly maintenanceDescription: string;
  @Field()
  readonly dateOfMaintenance: Date;
  @Field()
  readonly assetId: string;
  @Field()
  readonly userId: string;
}

