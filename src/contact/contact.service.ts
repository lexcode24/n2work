import { Injectable } from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {PrismaService} from "../prisma.service";

@Injectable()
export class ContactService extends BaseService {

    protected readonly model;

    constructor(protected readonly prisma: PrismaService){
        super(prisma);
        this.model = this.prisma.contact;
    }


}
