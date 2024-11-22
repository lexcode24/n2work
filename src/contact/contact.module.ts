import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import {BaseService} from "../base/base.service";
import {PrismaService} from "../prisma.service";
import {BaseModule} from "../base/base.module";

@Module({
  controllers: [ContactController],
  providers: [ContactService, BaseService, PrismaService],
  imports: [],
})
export class ContactModule extends BaseModule {}
