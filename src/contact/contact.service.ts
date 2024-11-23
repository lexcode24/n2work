import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class ContactService extends BaseService<any> {
    constructor(prisma: PrismaService) {
        super(prisma, 'contact');
    }

    customLogic() {
        return { message: 'Custom logic for Contact module' };
    }
}