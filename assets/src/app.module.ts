import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
 import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AssetsModuleQL } from './asset/assets.module';
import { UserDTO } from './asset/dto/user.dto';

import { AppService } from './app.service';
import { AppController } from './app.controller';

const url = process.env.MONGO_URL || 'localhost';
const user = process.env.USER;
const password = process.env.PASS;

const errorName = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  SERVER_ERROR: 'SERVER_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const errorType = {
  UNAUTHENTICATED: {
    message: 'You dont have credentials.',
    statusCode: 403,
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'My error.',
    statusCode: 500,
  },
};

const getErrorCode = (errorName) => {
  return errorType[errorName];
};

@Module({
  imports: [
    AssetsModuleQL,
    GraphQLFederationModule.forRoot({
      //  autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      autoSchemaFile: true,
      context: ({ req }) => {
        // console.log(req.headers);
      },
      
      formatError: (err) => {
        console.log(err.extensions.code);
        const error = getErrorCode(err.extensions.code);
        return { message: error.message, statusCode: error.statusCode };
      },
      debug: false,
    }),

    MongooseModule.forRoot(`mongodb://user-mongo-srv:27017/assets`, {}),

    // ClientsModule.register([
    //   {
    //     name: 'GREETING_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       host: '127.0.0.1',
    //       port: 8080,
    //     },
    //   },
    // ClientsModule.register([
    //     {
    //       name: 'GREETING_SERVICE',
    //       transport: Transport.NATS,
    //       options: {
    //         servers: ['nats://nats-srv:4222'],
    //       }
    //     },
    //   ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

