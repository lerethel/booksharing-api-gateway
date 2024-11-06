import { Controller, Get } from '@nestjs/common';
import { IndexService } from '../services/index.service';

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  getCounts() {
    return this.indexService.getCounts();
  }
}
