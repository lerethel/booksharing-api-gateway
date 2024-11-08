import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH') private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const { token } = request.cookies;

    try {
      request.user =
        // This will either work or throw an HTTP error.
        await lastValueFrom(this.client.send({ cmd: 'authorize' }, { token }));
    } catch (e) {
      throw new RpcException(e);
    }

    return true;
  }
}
