import { Controller } from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { BaseCatalogController } from './base/base-catalog.controller';

@Controller('genre')
export class GenreController extends BaseCatalogController<GenreService> {
  constructor(genreService: GenreService) {
    super(genreService);
  }
}
