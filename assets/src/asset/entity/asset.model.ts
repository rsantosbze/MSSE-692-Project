import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
// import { Organization } from './organization.model';
// import { MaintenanceRecord } from './maintenance-record.model';


@Schema()
export class Asset extends Document {
  // @Field(() => String)
  // @Prop()
  // _id?: MongooseSchema.Types.ObjectId;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization' })
  // supplier: Organization;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization' })
  // facility: Organization;

  @Prop()
  assetName: string;

  @Prop({ required: true, unique: true })
  assetCode: string;

  @Prop()
  assetDescription: string;

  @Prop()
  userId: string;

  @Prop()
  facilityId: string;

  @Prop()
  supplierId: string;

  @Prop()
  dateOfManufacture: Date;

  @Prop()
  dateOfInstallation: Date;

  @Prop({ default: Date.now })
  dateCreated: Date;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'MaintenanceRecord' }] })
  // maintenanceRecords: MaintenanceRecord[];
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
