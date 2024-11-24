import { Module } from '@nestjs/common';
import { BaseModule } from '../../core/base/base.module';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
    imports: [BaseModule.register(ContactService)],
    controllers: [ContactController],
})
export class ContactModule {}