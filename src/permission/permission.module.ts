import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import {BaseModule} from "../base/base.module";

@Module({
  imports: [BaseModule.register(PermissionService)],
  controllers: [PermissionController],
})
export class PermissionModule {}
