import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserRoles } from 'src/common/enums/user-roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly minRole: UserRoles) {}

  canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest<Request>();
    return user.role >= this.minRole;
  }
}
