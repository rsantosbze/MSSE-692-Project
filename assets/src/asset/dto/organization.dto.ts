import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { AssetDTO } from './asset.dto';


@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class OrganizationDTO {
  @Field((type) => ID)
  @Directive('@external')
  _id: string;

  @Field((type) => [AssetDTO])
  fassets: AssetDTO[];

  @Field((type) => [AssetDTO])
  sassets: AssetDTO[];
}

// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "_id")')
// export class OrganizationDTO {
//   @Field((type) => ID)
//   @Directive('@external')
//   _id: string;

//   @Field((type) => [AssetDTO])
//   assets: AssetDTO[];
// }




// @ObjectType()
// @Directive('@extends')
// @Directive('@key(fields: "_id")')
// export class OrganizationDTO {
//   @Field((type) => ID)
//   @Directive('@external')
//   _id: string;

//   @Field((type) => [AssetDTO])
//   sassets: AssetDTO[];
// }

