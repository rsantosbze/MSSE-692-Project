
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsRepository } from './assets.repository';
import { AssetsResolver } from './assets.resolver';
import { AssetsService } from './assets.service';
import { AssetSchema } from './entity/asset.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
 import { UserResolver } from './user.resolver';
 import { AppService } from '../app.service';
import { OrganizationResolver } from './organization.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard} from './graphql.auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Asset', schema: AssetSchema }]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats-srv:4222'],
        },
      },
    ]),

    PassportModule.register({
      defaultStrategy: 'jwt-asset',
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

  providers: [
    AssetsResolver,
    AssetsService,
    AssetsRepository,
    UserResolver,
    OrganizationResolver,
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [AssetsService, AssetsRepository],
})
export class AssetsModuleQL {}
