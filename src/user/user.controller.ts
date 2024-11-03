import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
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
  @UseGuards(AuthGuard)
  updateName(@Body() dto: Record<string, any>, @User() id: number) {
    return this.userService.updateName(dto, id);
  }

  @Put('email')
  @UseGuards(AuthGuard)
  updateEmail(@Body() dto: Record<string, any>, @User() id: number) {
    return this.userService.updateEmail(dto, id);
  }

  @Put('password')
  @UseGuards(AuthGuard)
  updatePassword(@Body() dto: Record<string, any>, @User() id: number) {
    return this.userService.updatePassword(dto, id);
  }

  @Post('delete')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  remove(@Body() dto: Record<string, any>, @User() id: unknown) {
    return this.userService.remove(dto, id);
  }
}
