import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt-user') {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;

    }

}