import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BookService {
  constructor(@Inject('CATALOG') private readonly client: ClientProxy) {}

  create(dto: Record<string, any>) {
    return this.client.send({ cmd: 'createBook' }, { dto });
  }

  findAll(populate?: string) {
    return this.client.send({ cmd: 'findAllBooks' }, { populate });
  }

  findOne(id: string, populate?: string) {
    return this.client.send({ cmd: 'findOneBook' }, { id, populate });
  }

  update(id: string, dto: Record<string, any>) {
    return this.client.send({ cmd: 'updateBook' }, { id, dto });
  }

  remove(id: string) {
    return this.client.send({ cmd: 'deleteBook' }, { id });
  }
}
