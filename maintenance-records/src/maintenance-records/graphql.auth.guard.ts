import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt-maintenance') {
    getRequest(context: ExecutionContext) {
        console.log('I am called Maintenances');
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

}