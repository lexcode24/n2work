import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseService } from './base.service';

@Module({
    imports: [PrismaModule],
    providers: [BaseService],
    exports: [BaseService],
})
export class BaseModule {}