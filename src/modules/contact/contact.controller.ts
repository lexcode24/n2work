import {Body, Controller, Post} from '@nestjs/common';
import { BaseController } from '../../core/base/base.controller';
import { ContactService } from './contact.service';
import {CreateContactDto} from "./dto/contact.dto";

@Controller('contacts')
export class ContactController extends BaseController {
    constructor(service: ContactService) {
        super(service);
    }

    @Post()
    async create(@Body() data: CreateContactDto) {
        return super.create(data);
    }

}