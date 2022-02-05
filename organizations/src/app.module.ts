import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { OrganizationsModuleQL } from './organization/organizations.module';

@Module({
  imports: [
    OrganizationsModuleQL,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => {
        //console.log(req.headers);
      },
    }),
    MongooseModule.forRoot(`mongodb://user-mongo-srv:27017/organizations`, {}),


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
  controllers: [],
  providers: [],
})
export class AppModule {}
