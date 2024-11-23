import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import {PaginationArgsWithSearchTerm} from "../utils/pagination.util";
import {Auth} from "../auth/decorators/auth.decorator";

@Controller('base')
export class BaseController {

  constructor( protected readonly service: BaseService) {}

  @Auth('old_base.create')
  @Post()
  create(@Body() createBaseDto: CreateBaseDto) {
    console.log('createBaseDto', CreateBaseDto);
    return this.service.create(createBaseDto);
  }

  @Auth('old_base.read')
  @Get()
  findAll(@Query() params: PaginationArgsWithSearchTerm) {
    return this.service.findAll(params);
  }

  @Auth('old_base.read')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Auth('old_base.update')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.service.update(+id, updateBaseDto);
  }

  @Auth('old_base.delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
