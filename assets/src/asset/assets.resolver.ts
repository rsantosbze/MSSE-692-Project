// import { Asset } from './entity/asset.model';
import { ResponseADTO} from './dto/response.dto';
import { AssetInputDTO } from './graphDTO/asset.input.dto';
import { Resolver, Query, Mutation, Args, ResolveReference, ResolveField, Parent } from "@nestjs/graphql";
import { AssetsService } from './assets.service';
import { AssetDTO } from './dto/asset.dto';
import { UserDTO } from './dto/user.dto';
import { AppService } from 'src/app.service';
import { OrganizationDTO } from './dto/organization.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './graphql.auth.guard';

@Resolver((of) => AssetDTO)
export class AssetsResolver {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly appService: AppService,
  ) {}

  @Query(() => [AssetDTO])
  //@UseGuards(GqlAuthGuard1)
  async findAllAssets() {
    return this.assetsService.findAll();
  }

  @Query(() => String)
  //@UseGuards(GqlAuthGuard1)
  async runAssetNats() {
    //return this.assetsService.getHelloAsync();
    return 'hello';
  }

  //   @Query(() => AssetResponseDTO)
  //   async findAsset(
  //     @Args('_id', { type: () => String }) _id: mongoose.Types.ObjectId,
  //   ) {
  //     return this.assetsService.findOne(_id);
  //   }

  @Query(() => AssetDTO)
  async findAsset(@Args('_id', { type: () => String }) _id: string) {
    return this.assetsService.findOne(_id);
  }

  @Mutation(() => ResponseADTO)
  async createAsset(@Args('input') input: AssetInputDTO) {
    return this.assetsService.create(input);
  }

  @Mutation(() => ResponseADTO)
  async deleteAsset(@Args('input') input: AssetInputDTO) {
    return this.assetsService.delete(input);
  }
  @Mutation(() => ResponseADTO)
  async updateAsset(@Args('input') input: AssetInputDTO) {
    return this.assetsService.update(input);
  }

  @ResolveField((of) => UserDTO)
  userDTO(@Parent() asset: AssetDTO) {
    return { __typename: 'UserDTO', _id: asset.userId };
  }

  @ResolveField((of) => OrganizationDTO)
  facilityDTO(@Parent() asset: AssetDTO) {
    return { __typename: 'OrganizationDTO', _id: asset.facilityId };
  }

  @ResolveField((of) => OrganizationDTO)
  supplierDTO(@Parent() asset: AssetDTO) {
    return { __typename: 'OrganizationDTO', _id: asset.supplierId };
  }

  @ResolveReference()
  resolvereference(ref: { __typename: string; _id: string }) {
    return this.assetsService.findOne(ref._id);
  }
}
