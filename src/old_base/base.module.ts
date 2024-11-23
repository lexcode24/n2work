import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseController } from './base.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [BaseController],
  providers: [BaseService, PrismaService],
  exports: [BaseService]
})
export class BaseModule {}
