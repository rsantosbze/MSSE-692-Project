
import { ObjectType, Field, InputType } from '@nestjs/graphql';
// import { AddressDTO } from '../../address/graphDTO/address.dto';
import {IsNotEmpty, IsEmail } from 'class-validator';
@InputType()
export class UserInputDTO {
  @Field(() => String, { nullable: true })
  _id?: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly username: string;
  @Field({ nullable: true })
  readonly password?: string;

  @IsEmail()
  @Field()
  readonly email: string;
  @Field(() => Boolean)
  readonly status: boolean;
  @Field()
  readonly role: string;
  @Field()
  readonly organizationId: string;
  // @Field(() => AddressDTO, { nullable: true })
  // address: [AddressDTO];
}

