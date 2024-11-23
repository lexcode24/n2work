import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { BaseModule } from '../base/base.module';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule, BaseModule],         // Подключаем BaseModule
  controllers: [ContactController],
  providers: [ContactService],   // Используем ContactService
})
export class ContactModule {}