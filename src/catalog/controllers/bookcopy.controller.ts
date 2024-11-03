import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { BookcopyService } from '../services/bookcopy.service';
import { BaseCatalogController } from './base/base-catalog.controller';

@Controller('bookcopy')
export class BookcopyController extends BaseCatalogController<BookcopyService> {
  constructor(bookcopyService: BookcopyService) {
    super(bookcopyService);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: Record<string, any>, @User() owner: unknown) {
    return this.service.create(dto, owner);
  }

  @Patch(':id/loan')
  @UseGuards(AuthGuard)
  loan(
    @Param('id') id: string,
    @Body('borrower') borrower: unknown,
    @User() owner: unknown,
  ) {
    return this.service.loan(id, borrower, owner);
  }

  @Patch(':id/return')
  @UseGuards(AuthGuard)
  return(@Param('id') id: string, @User() owner: unknown) {
    return this.service.return(id, owner);
  }
}
