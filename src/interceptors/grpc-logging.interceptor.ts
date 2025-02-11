import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class GrpcLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GrpcLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const rpc = context.switchToRpc();
    const method = context.getHandler().name;
    const data = rpc.getData();
    const metadata = rpc.getContext();

    // Log the incoming request
    this.logger.log({
      type: 'gRPC Request',
      method,
      metadata: this.sanitizeMetadata(metadata),
      data: this.sanitizeData(data),
    });

    return next.handle().pipe(
      tap((response) => {
        // Log the successful response
        this.logger.log({
          type: 'gRPC Response',
          method,
          duration: `${Date.now() - start}ms`,
          response: this.sanitizeData(response),
        });
      }),
      catchError((error) => {
        // Log the error
        this.logger.error({
          type: 'gRPC Error',
          method,
          duration: `${Date.now() - start}ms`,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        });
        return throwError(() => error);
      }),
    );
  }

  private sanitizeMetadata(metadata: any): any {
    const result = { ...metadata };
    if (result.authorization) {
      result.authorization = '[REDACTED]';
    }
    return result;
  }

  private sanitizeData(data: any): any {
    if (!data) return data;
    const result = { ...data };
    if (result.password) {
      result.password = '[REDACTED]';
    }
    return result;
  }
}
