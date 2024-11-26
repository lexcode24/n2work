import {Body, Controller, Param, Post, Put} from '@nestjs/common';
import { BaseController } from '../../core/base/base.controller';
import { ContactService } from './contact.service';
import {CreateContactDto, UpdateContactDto} from "./dto/contact.dto";

@Controller('contacts')
export class ContactController extends BaseController {
    constructor(service: ContactService) {
        super(service);
    }

    @Post()
    async create(@Body() data: CreateContactDto) {
        return super.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateContactDto) {
        return super.update(id, data);
    }

}