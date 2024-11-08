import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
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
  updateName(@Body() dto: Record<string, any>, @User() id: number) {
    return this.userService.updateName(dto, id);
  }

  @Put('email')
  @Auth()
  updateEmail(@Body() dto: Record<string, any>, @User() id: number) {
    return this.userService.updateEmail(dto, id);
  }

  @Put('password')
  @Auth()
  updatePassword(@Body() dto: Record<string, any>, @User() id: number) {
    return this.userService.updatePassword(dto, id);
  }

  @Post('delete')
  @HttpCode(200)
  @Auth()
  remove(@Body() dto: Record<string, any>, @User() id: unknown) {
    return this.userService.remove(dto, id);
  }
}
