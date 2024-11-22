import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import {PaginationArgsWithSearchTerm} from "../utils/pagination.util";
import {Auth} from "../auth/decorators/auth.decorator";

@Controller('base')
export class BaseController {

  constructor( protected readonly service: BaseService) {}

  @Auth('base.create')
  @Post()
  create(@Body() createBaseDto: CreateBaseDto) {
    console.log('createBaseDto', CreateBaseDto);
    return this.service.create(createBaseDto);
  }

  @Auth('base.read')
  @Get()
  findAll(@Query() params: PaginationArgsWithSearchTerm) {
    return this.service.findAll(params);
  }

  @Auth('base.read')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Auth('base.update')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.service.update(+id, updateBaseDto);
  }

  @Auth('base.delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
