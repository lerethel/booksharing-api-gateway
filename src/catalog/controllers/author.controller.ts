import { Controller } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { BaseCatalogController } from './base/base-catalog.controller';

@Controller('author')
export class AuthorController extends BaseCatalogController<AuthorService> {
  constructor(authorService: AuthorService) {
    super(authorService);
  }
}
