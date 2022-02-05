//import { CustomValidationPipe } from './../common/custom.validation.pipe';


import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginStatusDTO, RegisterResponseDTO } from './dto/response.dto';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './graphDTO/auth.dto';
import { UsePipes } from '@nestjs/common';


@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

   
    @Mutation(() => LoginStatusDTO)
   // @UsePipes(new CustomValidationPipe)
    async login(@Args('input') input: LoginDTO) {
        return this.authService.login(input);
    }

    @Mutation(() => RegisterResponseDTO)
    async registerUser(@Args('input') input: RegisterDTO) {
        return this.authService.register(input);
    }
    
}
