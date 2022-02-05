
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';


@Schema()
export class MaintenanceRecord extends Document {
  // @Field(() => String)
  // @Prop()
  // _id?: MongooseSchema.Types.ObjectId;

  @Prop()
  dateOfMaintenance: Date;

  @Prop()
  maintenanceDescription: string;

  @Prop({ default: Date.now })
  dateCreated: Date;

  @Prop()
  assetId: string;

  @Prop()
  userId: string;
}

export const MaintenanceRecordSchema = SchemaFactory.createForClass(MaintenanceRecord);
