import {
    BadRequestException,
    Body,
    Controller,
    Inject,
    Post,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Controller()
export class BaseTestController {
    constructor(@Inject('CREATE_DTO') private readonly createDto: any) {}

    @Post()
    async create(@Body() data: any) {
        const dtoInstance = plainToClass(this.createDto, data);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return dtoInstance;
    }
}