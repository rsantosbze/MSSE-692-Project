import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { UserDTO } from './user.dto';


@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class OrganizationDTO {
  @Field((type) => ID)
  @Directive('@external')
  _id: string;

  @Field((type) => [UserDTO])
  users: UserDTO[];
}






