import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserRoles } from 'src/common/enums/user-roles.enum';
import { BaseCatalogService } from './base-catalog-service.interface';

export abstract class BaseCatalogController<T extends BaseCatalogService> {
  constructor(protected readonly service: T) {}

  @Post()
  @Auth()
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
  @Auth()
  update(@Param('id') id: string, @Body() dto: Record<string, any>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Auth(UserRoles.Editor)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
