import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserRoles } from 'src/common/enums/user-roles.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() dto: Record<string, any>) {
    return this.userService.create(dto);
  }

  @Put('name')
  @Auth()
  updateName(@Body() dto: Record<string, any>, @User() id: unknown) {
    return this.userService.updateName(dto, id);
  }

  @Put('email')
  @Auth()
  updateEmail(@Body() dto: Record<string, any>, @User() id: unknown) {
    return this.userService.updateEmail(dto, id);
  }

  @Put('password')
  @Auth()
  updatePassword(@Body() dto: Record<string, any>, @User() id: unknown) {
    return this.userService.updatePassword(dto, id);
  }

  @Put(':id/role')
  @Auth(UserRoles.Admin)
  updateRole(@Body('role') role: UserRoles, @Param('id') id: string) {
    return this.userService.updateRole(role, id);
  }

  @Post('delete')
  @HttpCode(200)
  @Auth()
  remove(@Body() dto: Record<string, any>, @User() id: unknown) {
    return this.userService.remove(dto, id);
  }
}
