import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrganizationDTO } from './dto/organization.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.model';
import { UsersService } from './users.service';


@Resolver((of) => OrganizationDTO)
export class OrganizationResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField((of) => [UserDTO])
  users(@Parent() organization: OrganizationDTO): Promise<User[]> {
    return this.usersService.forOrganization(organization._id);
  }
}
