import {Controller} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {ContactService} from "./contact.service";


@Controller('contact')
export class ContactController extends BaseController {

    constructor(protected readonly service: ContactService) {
        super(service);
    }
}
