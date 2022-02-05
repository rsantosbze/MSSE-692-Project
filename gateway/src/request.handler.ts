import { RemoteGraphQLDataSource } from '@apollo/gateway';
import type { GraphQLRequest } from 'apollo-server-core';
import type express from 'express';

export class RequestHandler extends RemoteGraphQLDataSource {
  willSendRequest({
    context,
    request,
  }: {
    context: { req: express.Request };
    request: GraphQLRequest;
  }) {
    request.http?.headers.set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1enoiLCJ1c2VySWQiOiI2MWY3MGMyNWIxNGM4YjIwMGIyMzIxZWEiLCJpc0FkbWluIjpmYWxzZSwib3JnYW5pemF0aW9uSWQiOiI2MWY3MGMwNWQyMGEwZTVmY2NmMGUzOGUiLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImlhdCI6MTY0MzU4MDUwOSwiZXhwIjoxNjQzNTgwODA5fQ.FCLG5DGvdhA7iV3o2cIWSmqiPv5JEbEMRyKsW5PMr0o',
    );
  }
}
