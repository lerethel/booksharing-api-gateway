import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
