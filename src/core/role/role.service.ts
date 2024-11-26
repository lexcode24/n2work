import { Injectable } from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Role} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class RoleService extends BaseService<Role>{
    constructor(prisma: PrismaService){
        super(prisma, 'role');
    }
}