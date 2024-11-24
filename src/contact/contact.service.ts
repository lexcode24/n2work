import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { Contact } from '@prisma/client';

@Injectable()
export class ContactService extends BaseService<Contact> {
    constructor(prisma: PrismaService) {
        super(prisma, 'contact');
    }
}