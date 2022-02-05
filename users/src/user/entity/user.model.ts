import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { truncate } from 'fs/promises';
import { Password } from '../services/password';

@Schema()
export class User extends Document {
  // @Prop({required: false})
  // _id?: mongoose.Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true, enum: ['ADMIN', 'USER'] })
  role: string;

  @Prop({ default: Date.now })
  dateCreated: Date;

  @Prop()
  organizationId: string;

}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
   }
 });

