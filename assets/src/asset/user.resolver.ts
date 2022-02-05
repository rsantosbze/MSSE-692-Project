import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { AssetDTO } from './dto/asset.dto';
import { UserDTO } from './dto/user.dto';
import { Asset } from './entity/asset.model';



@Resolver((of) => UserDTO)
export class UserResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @ResolveField((of) => [AssetDTO])
  assets(@Parent() user: UserDTO): Promise<Asset[]> {
    return this.assetsService.forUser(user._id);
  }
}
