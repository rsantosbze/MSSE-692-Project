import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { decode, JwtPayload } from 'jsonwebtoken';
  import { DataSource } from './datasource';


class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    // const payload = await decode(context.jwt);
    request.http.headers.set('Authorization', context.jwt);
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticatedDataSource) => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            { name: 'users', url: 'http://users-srv:3001/graphql' },
            { name: 'assets', url: 'http://assets-srv:3002/graphql' },
            {
              name: 'maintenancerecords',
              url: 'http://maintenancerecords-srv:3003/graphql',
            },
            {
              name: 'organizations',
              url: 'http://organizations-srv:3004/graphql',
            },
          ], 
          serviceHealthCheck: true,
          formatError: (err) => {
          //   console.log(err.extensions);
          //   // Don't give the specific errors to the client.
          //   // if (err.message.startsWith('Database Error: ')) {
             return new Error('Internal server errorss');
          //   // }
          //   // Otherwise return the original error. The error can also
          //   // be manipulated in other ways, as long as it's returned.
          //   // return err;
           },
          debug: false
        },
        server: {
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
  //   imports: [

  // GraphQLGatewayModule.forRoot({
  //       server: {
  //         cors: true,
  //         context: ({ req }) => ({

  //           jwt: req.headers.authorization,

  //         }),
  //       },
  //       gateway: {
  //         serviceList: [
  //           { name: 'users', url: 'http://users-srv:3001/graphql' },
  //           { name: 'assets', url: 'http://assets-srv:3002/graphql' },
  //           {
  //             name: 'maintenancerecords',
  //             url: 'http://maintenancerecords-srv:3003/graphql',
  //           },
  //           {
  //             name: 'organizations',
  //             url: 'http://organizations-srv:3004/graphql',
  //           },
  //         ],
  //         // buildService: ({ url }) => new DataSource({ url }),
  //       },

  //     }),
  //   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
