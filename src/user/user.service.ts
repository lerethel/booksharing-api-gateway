import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { BookcopyService } from 'src/catalog/services/bookcopy.service';
import { UserRoles } from 'src/common/enums/user-roles.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER') private readonly client: ClientProxy,
    private readonly bookcopyService: BookcopyService,
    private readonly authService: AuthService,
  ) {}

  create(dto: Record<string, any>) {
    return this.client.send({ cmd: 'createUser' }, { dto });
  }

  updateName(dto: Record<string, any>, id: unknown) {
    return this.client.send({ cmd: 'updateUserName' }, { dto, id });
  }

  updateEmail(dto: Record<string, any>, id: unknown) {
    return this.client.send({ cmd: 'updateUserEmail' }, { dto, id });
  }

  updatePassword(dto: Record<string, any>, id: unknown) {
    return this.client.send({ cmd: 'updateUserPassword' }, { dto, id });
  }

  async updateRole(role: UserRoles, id: string) {
    await Promise.all([
      lastValueFrom(this.client.send({ cmd: 'updateUserRole' }, { role, id })),
      // Since the auth microservice doesn't know the id type and doesn't validate it,
      // try converting the id to a number and roll back if it's not a number.
      lastValueFrom(this.authService.updateRole(+id || id, role)),
    ]);
    return null;
  }

  async remove(dto: Record<string, any>, id: unknown) {
    await lastValueFrom(this.client.send({ cmd: 'deleteUser' }, { dto, id }));
    await Promise.all([
      lastValueFrom(this.bookcopyService.removeAllByOwner(id)),
      lastValueFrom(this.authService.logoutEverywhere(id)),
    ]);
    return null;
  }

  // This method doesn't have a route and is for internal use only.
  verify(dto: Record<string, any>) {
    return this.client.send({ cmd: 'verifyUser' }, { dto });
  }
}
