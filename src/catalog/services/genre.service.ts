import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GenreService {
  constructor(@Inject('CATALOG') private readonly client: ClientProxy) {}

  create(dto: Record<string, any>) {
    return this.client.send({ cmd: 'createGenre' }, { dto });
  }

  findAll(populate?: string) {
    return this.client.send({ cmd: 'findAllGenres' }, { populate });
  }

  findOne(id: string, populate?: string) {
    return this.client.send({ cmd: 'findOneGenre' }, { id, populate });
  }

  update(id: string, dto: Record<string, any>) {
    return this.client.send({ cmd: 'updateGenre' }, { id, dto });
  }

  remove(id: string) {
    return this.client.send({ cmd: 'deleteGenre' }, { id });
  }
}
