import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';

@ObjectType()
export class ResponseADTO {
  @Field()
  action: string;
  @Field({ nullable: true })
  message: string;
  @Field({ nullable: true })
  isValid: boolean;
  @Field({ nullable: true })
  isAdmin: boolean;
  @Field({ nullable: true })
  isActive: boolean;
  @Field({ nullable: true })
  statusCode: number;
}

