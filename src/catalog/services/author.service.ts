import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthorService {
  constructor(@Inject('CATALOG') private readonly client: ClientProxy) {}

  create(dto: Record<string, any>) {
    return this.client.send({ cmd: 'createAuthor' }, { dto });
  }

  findAll(populate?: string) {
    return this.client.send({ cmd: 'findAllAuthors' }, { populate });
  }

  findOne(id: string, populate?: string) {
    return this.client.send({ cmd: 'findOneAuthor' }, { id, populate });
  }

  update(id: string, dto: Record<string, any>) {
    return this.client.send({ cmd: 'updateAuthor' }, { id, dto });
  }

  remove(id: string) {
    return this.client.send({ cmd: 'deleteAuthor' }, { id });
  }
}
