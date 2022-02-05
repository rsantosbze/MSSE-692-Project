//import { GqlAuthGuard } from './../../../auth/graphql.auth.guard';
import { ResponseDTO} from './dto/response.dto';

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { UsersService } from "./users.service";
import { UseGuards } from '@nestjs/common';
import { UserInputDTO } from './graphDTO/user.input.dto';
import { UserDTO } from './dto/user.dto';
import { OrganizationDTO } from './dto/organization.dto';
import { GqlAuthGuard } from './graphql.auth.guard';

@Resolver((of) => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDTO])
  async findAllUsers() {
    return this.usersService.findAll();
  }
  @Mutation(() => ResponseDTO)
  async createUser(@Args('input') input: UserInputDTO) {
    return this.usersService.create(input);
  }
  @Mutation(() => ResponseDTO)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('input') input: UserInputDTO) {
    return this.usersService.delete(input);
  }

  @Mutation(() => ResponseDTO)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('input') input: UserInputDTO) {
    return this.usersService.update(input);
  }

  @ResolveReference()
  resolvereference(ref: { __typename: string; _id: string }) {
    return this.usersService.findOne(ref._id);
  }

  @ResolveField((of) => OrganizationDTO)
  organization(@Parent() user: UserDTO) {
    return { __typename: 'OrganizationDTO', _id: user.organizationId };
  }
}
