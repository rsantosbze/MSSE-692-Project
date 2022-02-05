import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { truncate } from 'fs/promises';
import { OrganizationDTO } from './organization.dto';


@ObjectType()
@Directive('@key(fields: "_id")')
export class UserDTO {
  @Field((type) => ID)
  readonly _id: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly username: string;
  @Field()
  readonly email: string;
  @Field()
  readonly status: boolean;
  @Field()
  readonly role: string;
  @Field((type) => OrganizationDTO)
  organization: OrganizationDTO;
  @Field()
  organizationId: string;
  // @Field(() => AddressResponseDTO)
  // readonly address: [AddressResponseDTO];
}
