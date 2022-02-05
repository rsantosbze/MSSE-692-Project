import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import { Address } from './address.model';
// import { Asset } from './asset.model';
// import { User } from './user.model';

@Schema()
export class Organization extends Document {
  @Prop({ required: true })
  organizationName: string;

  @Prop({
    required: true,
    enum: ['COMPANY', 'FACILITY', 'SUPPLIER', 'CONTRACTOR'],
  })
  organizationType: string;

  @Prop()
  contactPerson: string;

  @Prop()
  contactBusinessNo: string;

  @Prop()
  contactEmail: string;
  @Prop()
  addressType: string;
  @Prop()
  streetLine1: string;
  @Prop()
  streetLine2: string;
  @Prop()
  city: string;
  @Prop()
  zipCode: string;
  @Prop()
  country: string;

  @Prop({ default: Date.now })
  dateCreated: Date;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  // users: User[];

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Address' })
  // address: Address;

  // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Asset' }] })
  // assets: Asset[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
