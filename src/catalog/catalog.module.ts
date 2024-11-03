import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { BookcopyController } from './controllers/bookcopy.controller';
import { GenreController } from './controllers/genre.controller';
import { IndexController } from './controllers/index.controller';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import { BookcopyService } from './services/bookcopy.service';
import { GenreService } from './services/genre.service';
import { IndexService } from './services/index.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOG',
        transport: Transport.TCP,
        options: { port: 3001, host: 'booksharing-catalog' },
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    AuthorController,
    BookController,
    BookcopyController,
    GenreController,
    IndexController,
  ],
  providers: [
    AuthorService,
    BookService,
    BookcopyService,
    GenreService,
    IndexService,
  ],
  exports: [BookcopyService],
})
export class CatalogModule {}
