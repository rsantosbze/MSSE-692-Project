
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class RegisterDTO {
  @IsNotEmpty()
  @Field()
  readonly username: string;
  @IsNotEmpty()
  @Field()
  readonly password: string;
  @IsEmail()
  @Field()
  readonly email: string;
  @IsNotEmpty()
  @Field()
  readonly organizationId: string;
}
@InputType()
export class LoginDTO {
    @Field()
    @IsNotEmpty()
    readonly username: string;
    @Field()
    @IsNotEmpty()
    readonly password: string;
}