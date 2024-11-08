import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRoles } from '../enums/user-roles.enum';

export const Auth = (minRole: UserRoles = UserRoles.User) =>
  applyDecorators(UseGuards(AuthGuard), UseGuards(new RoleGuard(minRole)));
