import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const metadata = context.switchToRpc().getContext();
    const authorization = metadata.get('authorization')[0];

    if (!authorization) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'No authorization token provided',
      });
    }

    // In a real application, validate the token here
    // For now, just check if it exists
    return true;
  }
}
