

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginStatusDTO, RegisterResponseDTO } from './dto/response.dto';
import { RegisterDTO, LoginDTO } from './graphDTO/auth.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
//import { AppConfig } from 'src/config';
import { UsersService } from './users.service';
import { User } from './entity/user.model';
import { Password } from './services/password';

//const config = new AppConfig();

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async register(registerDTO: RegisterDTO): Promise<RegisterResponseDTO> {
        let status: RegisterResponseDTO = {
            action: 'success',
            message: 'user registered',
        };

        try {
           return await this.usersService.register(registerDTO);
        } catch (err) {
            status = {
                action: 'error',
                message: err.message,
            };
        }

        return status;
    }

    async login(userLoginDTO: LoginDTO): Promise<LoginStatusDTO> {
        // find user in db
      
        const user = await this.usersService.findByLogin(userLoginDTO);

            if (user === null) {
                throw  new UnauthorizedException('User not Found');
            }
            if (!user.status) {
                throw new UnauthorizedException('User not Active');
                
            }
          //  let isValid = bcrypt.compareSync(userLoginDTO.password, user.password);
        let isValid = await Password.compare(user.password, userLoginDTO.password);
            if (!isValid) {
                throw new UnauthorizedException('Invalid Credentials');
            }
        
        let isAdmin = user.role === 'ADMIN' ? true : false;

            // generate and sign token
            const token = this._createToken(user, isAdmin);

            return {
                ...token,
            }
      
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.usersService.findByLogin(payload);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }

    private _createToken({ username, _id, organizationId, firstName, lastName }: User, isAdmin: boolean): any {
         const expiresIn = process.env.JWT_EXPIRE;

        const user: JwtPayload = { username, userId: _id, isAdmin, organizationId, firstName, lastName};
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }
}
