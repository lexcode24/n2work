import { Injectable } from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Contact } from '@prisma/client';

@Injectable()
export class ContactService extends BaseService<Contact> {
    constructor(prisma: PrismaService) {
        super(prisma, 'contact');
    }
}