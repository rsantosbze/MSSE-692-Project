
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrganizationSchema } from './entity/organization.model';
import { OrganizationsRepository } from './organizations.repository';
import { OrganizationsResolver } from './organizations.resolver';
import { OrganizationsService } from './organizations.service';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './graphql.auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
    ]),

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
      defaultStrategy: 'jwt-organization',
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
    OrganizationsResolver,
    OrganizationsService,
    OrganizationsRepository,
    JwtStrategy,
  ],
  exports: [OrganizationsService, OrganizationsRepository],
})
export class OrganizationsModuleQL {}
