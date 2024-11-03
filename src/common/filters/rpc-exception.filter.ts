import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const payload: any = error.error;
    const response = host.switchToHttp().getResponse<Response>();

    // Handle HTTP exceptions.
    if (payload && payload.status && payload.response) {
      return response.status(payload.status).json(payload.response);
    }

    // Handle other exceptions.
    const badGateway = new BadGatewayException();
    response.status(badGateway.getStatus()).json(badGateway.getResponse());
  }
}
