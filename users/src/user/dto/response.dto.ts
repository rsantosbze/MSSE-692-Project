import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';

@ObjectType()
export class ResponseDTO {
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
}

@ObjectType()
export class LoginStatusDTO {
  @Field()
  accessToken: string;
}

@ObjectType()
export class RegisterResponseDTO {
  @Field()
  action: string;
  @Field({ nullable: true })
  message?: string;
}