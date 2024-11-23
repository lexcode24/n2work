import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { BaseService } from '../old_base/base.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, BaseService, PrismaService]
})
export class PermissionModule {}
