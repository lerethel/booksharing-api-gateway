import { Controller } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { BaseCatalogController } from './base/base-catalog.controller';

@Controller('book')
export class BookController extends BaseCatalogController<BookService> {
  constructor(bookService: BookService) {
    super(bookService);
  }
}
