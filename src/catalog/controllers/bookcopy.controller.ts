import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { BookcopyService } from '../services/bookcopy.service';
import { BaseCatalogController } from './base/base-catalog.controller';

@Controller('bookcopy')
export class BookcopyController extends BaseCatalogController<BookcopyService> {
  constructor(bookcopyService: BookcopyService) {
    super(bookcopyService);
  }

  @Post()
  @Auth()
  create(@Body() dto: Record<string, any>, @User() owner: unknown) {
    return this.service.create(dto, owner);
  }

  @Patch(':id/loan')
  @Auth()
  loan(
    @Param('id') id: string,
    @Body('borrower') borrower: unknown,
    @User() owner: unknown,
  ) {
    return this.service.loan(id, borrower, owner);
  }

  @Patch(':id/return')
  @Auth()
  return(@Param('id') id: string, @User() owner: unknown) {
    return this.service.return(id, owner);
  }
}
