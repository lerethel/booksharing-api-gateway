import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { BaseCatalogService } from './base-catalog-service.interface';

export abstract class BaseCatalogController<T extends BaseCatalogService> {
  constructor(protected readonly service: T) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: Record<string, any>, @User() owner?: unknown) {
    return this.service.create(dto, owner);
  }

  @Get()
  findAll(@Query('populate') populate?: string) {
    return this.service.findAll(populate);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('populate') populate?: string) {
    return this.service.findOne(id, populate);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: Record<string, any>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
