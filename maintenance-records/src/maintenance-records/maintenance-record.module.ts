import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './graphql.auth.guard';

import { MaintenanceRecordService } from './maintenance-record.service';
import { MaintenanceRecordResolver } from './maintenance-record.resolver';
import { MaintenanceRecordSchema } from './entity/maintenance-record.model';
import { MaintenanceRecordsRepository } from './maintenance-record.repository';
import { AssetResolver } from './asset.resolver';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MaintenanceRecord', schema: MaintenanceRecordSchema },
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
      defaultStrategy: 'jwt-maintenance',
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
    MaintenanceRecordResolver,
    MaintenanceRecordService,
    MaintenanceRecordsRepository,
    AssetResolver,
    UserResolver,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [MaintenanceRecordService, MaintenanceRecordsRepository],
})
export class MaintenanceRecordModuleQL {}
