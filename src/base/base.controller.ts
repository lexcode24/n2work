import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { BaseService } from './base.service';

@Controller()
export class BaseController<CreateDto, UpdateDto> {
    constructor(
        private readonly service: BaseService<any>,
        private readonly createDto: new () => CreateDto,
        private readonly updateDto: new () => UpdateDto,
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    create(@Body() data: CreateDto) {
        console.log('DTO-Instanz:', data instanceof this.createDto); // Erwartet: true
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
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    update(@Param('id') id: number, @Body() data: UpdateDto) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}