import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BookcopyService {
  constructor(@Inject('CATALOG') private readonly client: ClientProxy) {}

  create(dto: Record<string, any>, owner: unknown) {
    return this.client.send({ cmd: 'createBookcopy' }, { dto, owner });
  }

  findAll(populate?: string) {
    return this.client.send({ cmd: 'findAllBookcopies' }, { populate });
  }

  findOne(id: string, populate?: string) {
    return this.client.send({ cmd: 'findOneBookcopy' }, { id, populate });
  }

  update(id: string, dto: Record<string, any>) {
    return this.client.send({ cmd: 'updateBookcopy' }, { id, dto });
  }

  remove(id: string) {
    return this.client.send({ cmd: 'deleteBookcopy' }, { id });
  }

  // This method doesn't have a route and is for internal use only.
  removeAllByOwner(owner: unknown) {
    return this.client.send({ cmd: 'deleteAllBookcopiesByOwner' }, { owner });
  }

  loan(id: string, borrower: unknown, owner: unknown) {
    return this.client.send({ cmd: 'loanBookcopy' }, { id, borrower, owner });
  }

  return(id: string, owner: unknown) {
    return this.client.send({ cmd: 'returnBookcopy' }, { id, owner });
  }
}
