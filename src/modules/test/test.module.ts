import { Module } from '@nestjs/common';
import { BaseTestModule } from '../base-test/base-test.module';
import { TestController } from './test.controller';
import {CreateTestDto} from "./test.dto";

@Module({
    imports: [BaseTestModule.register(CreateTestDto)],
    controllers: [TestController],
})
export class TestModule {}