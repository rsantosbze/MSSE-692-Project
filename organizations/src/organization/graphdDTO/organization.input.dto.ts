
import { ObjectType, Field, InputType } from '@nestjs/graphql';
// import { AddressDTO } from '../../address/graphDTO/address.dto';


@InputType()
export class OrganizationInputDTO {
    @Field({ nullable: true })
    _id: string;
    @Field({ nullable: true })
    readonly organizationName: string;
    @Field({ nullable: true })
    readonly organizationType: string;
    // @Field(() => AddressDTO, { nullable: true })
    // readonly address: [AddressDTO];
}
