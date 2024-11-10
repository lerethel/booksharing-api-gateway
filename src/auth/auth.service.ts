import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CookieOptions, Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { UserRoles } from 'src/common/enums/user-roles.enum';
import { UserService } from 'src/user/user.service';

const cookieOptions: CookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: 'strict',
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private readonly client: ClientProxy,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async login(dto: Record<string, any>, response: Response) {
    const user = await lastValueFrom(this.userService.verify(dto));

    if (!user) {
      throw new RpcException(
        new UnauthorizedException('Either email or password is wrong'),
      );
    }

    const { token, maxAge } = await lastValueFrom(
      this.client.send({ cmd: 'login' }, { user }),
    );
    response.cookie('token', token, { ...cookieOptions, maxAge });

    return null;
  }

  logout(response: Response) {
    response.clearCookie('token', cookieOptions);
    return this.client.send({ cmd: 'logout' }, {});
  }

  // The methods below don't have routes and are for internal use only.

  logoutEverywhere(id: unknown) {
    return this.client.send({ cmd: 'logoutEverywhere' }, { id });
  }

  updateRole(id: unknown, role: UserRoles) {
    return this.client.send({ cmd: 'updateRole' }, { user: { id, role } });
  }
}
