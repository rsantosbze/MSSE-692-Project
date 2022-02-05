import {NgModule} from '@angular/core';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

const uri = 'http://localhost/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
      cache: new InMemoryCache({
          addTypename: false,
          typePolicies: {
              Query: {
                  fields: {
                      findAllFacilities: {
                          merge(existing = [], incoming: any) {
                              return { ...existing, ...incoming };
                          },
                      },

                      findAllOrgs: {
                          merge(existing = [], incoming: any) {
                              return { ...existing, ...incoming };
                          },
                      },
                      findAllUsers: {
                          merge(existing = [], incoming: any) {
                              return { ...existing, ...incoming };
                          },
                      },
                      findAsset: {
                          merge(existing = [], incoming: any) {
                              return { ...existing, ...incoming };
                          },
                      },
                      findOrg: {
                          merge(existing = [], incoming: any) {
                              return { ...existing, ...incoming };
                          },
                      },
                  },
              },
          },
      }),
      link: httpLink.create({ uri }),
  };
}

@NgModule({
  providers: [
    {
      deps: [HttpLink],
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
    },
  ],
})
export class GraphQLModule {}
