import { Controller } from '@nestjs/common';
import { BaseTestController } from '../base-test/base-test.controller';

@Controller('test')
export class TestController extends BaseTestController{}