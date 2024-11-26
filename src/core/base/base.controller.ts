import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {BaseService} from "./base.service";
import {CreateBaseDto, UpdateBaseDto} from "./dto/base.dto";
import {PaginationArgsWithSearchTerm} from "../utils/pagination.util";
import {Auth} from "../auth/decorators/auth.decorator";

@Controller()
export class BaseController {
    constructor(
        private readonly service: BaseService<any>,
    ) {}

    @Auth('base.create')
    @Post()
    async create(@Body() data: CreateBaseDto)  {
        return this.service.create(data);
    }

    @Auth('base.read')
    @Get()
    findAll(@Query() params: PaginationArgsWithSearchTerm) {
        const { filters, skip, orderBy, groupBy } = params;
        return this.service.findAll(filters, skip, orderBy, groupBy);
    }

    @Auth('base.read')
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Auth('base.update')
    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateBaseDto) {
        return this.service.update(id, data);
    }

    @Auth('base.delete')
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}