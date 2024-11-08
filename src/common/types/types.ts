import { UserRoles } from '../enums/user-roles.enum';

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: unknown; role: UserRoles };
  }
}
