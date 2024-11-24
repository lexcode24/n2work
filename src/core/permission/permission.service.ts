import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { PrismaService } from '../prisma/prisma.service';
import {Permission} from "@prisma/client";

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(prisma: PrismaService){
      super(prisma, 'permission');
  }
}
