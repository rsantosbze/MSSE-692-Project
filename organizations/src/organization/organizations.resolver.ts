

import { Resolver, Query, Mutation, Args, ResolveReference } from "@nestjs/graphql";
import { OrganizationsService } from './organizations.service';
import { Schema as MongooseSchema } from 'mongoose';
import { OrganizationDTO } from "./dto/organization.dto";
import { ResponseOrgDTO } from "./dto/response.dto";
import { OrganizationInputDTO } from "./graphdDTO/organization.input.dto";
import { GqlAuthGuard } from './graphql.auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => OrganizationDTO)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query(() => [OrganizationDTO])
  async findAllOrgs() {
    return this.organizationsService.findAll({});
  }

  @Query(() => [OrganizationDTO])
  @UseGuards(GqlAuthGuard)
  async findAllFacilities() {
    return this.organizationsService.findAll({
      $or: [{ organizationType: 'FACILITY' }, { organizationType: 'SUPPLIER' }],
    });
  }

  @Query(() => [OrganizationDTO])
  async findMainCompany() {
    return this.organizationsService.findAll({
      $or: [{ organizationType: 'COMPANY' }],
    });
  }
  @Query(() => OrganizationDTO)
  async findOrg(@Args('_id', { type: () => String }) _id: string) {
    return this.organizationsService.findOne(_id);
  }
  @Mutation(() => ResponseOrgDTO)
  async createOrg(@Args('input') input: OrganizationInputDTO) {
    return this.organizationsService.create(input);
  }
  @Mutation(() => ResponseOrgDTO)
  @UseGuards(GqlAuthGuard)
  async deleteOrg(@Args('input') input: OrganizationInputDTO) {
    return this.organizationsService.delete(input);
  }

  @Mutation(() => ResponseOrgDTO)
  @UseGuards(GqlAuthGuard)
  async updateOrg(@Args('input') input: OrganizationInputDTO) {
    return this.organizationsService.update(input);
  }

  @ResolveReference()
  resolvereference(ref: { __typename: string; _id: string }) {
    return this.organizationsService.findOne(ref._id);
  }
}
