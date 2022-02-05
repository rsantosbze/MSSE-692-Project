import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UserSchema } from '../user/entity/user.model';
import { OrganizationResolver } from './organization.resolver';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt-user',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersResolver,
    UsersService,
    OrganizationResolver,
    UsersRepository,
    AuthResolver,
    AuthService,
    JwtStrategy,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModuleQL {}
