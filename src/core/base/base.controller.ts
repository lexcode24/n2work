import {Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {BaseService} from "./base.service";
import {CreateBaseDto, UpdateBaseDto} from "./dto/base.dto";

@Controller()
export class BaseController {
    constructor(
        private readonly service: BaseService<any>,
    ) {}

    @Post()
    async create(@Body() data: CreateBaseDto)  {
        return this.service.create(data);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateBaseDto) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}