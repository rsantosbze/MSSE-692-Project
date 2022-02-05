import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
 import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MaintenanceRecordModuleQL } from './maintenance-records/maintenance-record.module';

const url = process.env.MONGO_URL || 'localhost';
const user = process.env.USER;
const password = process.env.PASS;

@Module({
  imports: [
    MaintenanceRecordModuleQL,
    GraphQLFederationModule.forRoot({
      //  autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      autoSchemaFile: true,
      context: ({ req }) => {
      //  console.log(req.headers);
      },
    }),
    MongooseModule.forRoot(
      `mongodb://user-mongo-srv:27017/maintenance-records`,
      {},
    ),
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats-srv:4222'],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

