import { Module } from '@nestjs/common';

import { UsersModuleQL } from './user/users.module';
import { Context, GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
 import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { formatApolloErrors } from 'apollo-server-errors';

const url = process.env.MONGO_URL || 'localhost';
const user = process.env.USER;
const password = process.env.PASS;

const errorName = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  SERVER_ERROR: 'SERVER_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

const errorType = {
  USER_ALREADY_EXISTS: {
    message: 'User is already exists.',
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
    UsersModuleQL,
    GraphQLFederationModule.forRoot({
      //  autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      autoSchemaFile: true,
      context: ({ req }) => {
        //  console.log(req.headers);
      },
    //   formatError: (err) => {
    //   const error = getErrorCode(err.message)
    //   return ({ message: error.message, statusCode: error.statusCode })
    // },
    //   debug: false
    }),

    MongooseModule.forRoot(`mongodb://user-mongo-srv:27017/users`, {}),

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
