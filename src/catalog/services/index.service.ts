import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class IndexService {
  constructor(@Inject('CATALOG') private readonly client: ClientProxy) {}

  getCounts() {
    return this.client.send({ cmd: 'getCounts' }, {});
  }
}
