import { Controller, UsePipes, ValidationPipe} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { ContactService } from './contact.service';
import {CreateContactDto, UpdateContactDto} from "./dto/contact.dto";

@Controller('contacts')
@UsePipes(
    new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }),
)
export class ContactController extends BaseController<CreateContactDto, UpdateContactDto> {
    constructor(private readonly contactService: ContactService) {
        super(contactService, CreateContactDto, UpdateContactDto);
    }
}