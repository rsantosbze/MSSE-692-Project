import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { AssetDTO } from './dto/asset.dto';
import { OrganizationDTO } from './dto/organization.dto';
import { UserDTO } from './dto/user.dto';
import { Asset } from './entity/asset.model';



@Resolver((of) => OrganizationDTO)
export class OrganizationResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @ResolveField((of) => [AssetDTO])
  fassets(@Parent() organization: OrganizationDTO): Promise<Asset[]> {
    return this.assetsService.forFacility(organization._id);
  }

  @ResolveField((of) => [AssetDTO])
  sassets(@Parent() organization: OrganizationDTO): Promise<Asset[]> {
    return this.assetsService.forSupplier(organization._id);
  }
}
