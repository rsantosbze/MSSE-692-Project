import { ObjectType, Field, InputType, Directive, ID } from '@nestjs/graphql';


@ObjectType()
@Directive('@key(fields: "_id")')
export class OrganizationDTO {
  @Field((type) => ID)
  readonly _id: string;
  @Field()
  readonly organizationName: string;
  @Field()
  readonly organizationType: string;
  // @Field(() => [UserResponseDTO])
  // readonly users: [UserResponseDTO];
  // @Field(() => AddressResponseDTO)
  // readonly address: [AddressResponseDTO];
  // @Field(() => [AssetResponseDTO])
  // readonly assets: [AssetResponseDTO];
}

