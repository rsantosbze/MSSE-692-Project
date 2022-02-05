import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { User } from './entity/user.model';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-user') {

    constructor(private readonly authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException('Not Authorized to be here');
        }
        return user; 
    }
}
