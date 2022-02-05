import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { OrganizationsService } from './organizations.service';




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-organization') {
    

    constructor(private readonly organizationsService: OrganizationsService) {
       
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
      
        const user = await this.organizationsService.validateUser(payload);
        
        if (!user) {
            throw new UnauthorizedException('Not Authorized');
        }
        return  user;
    }
 }
