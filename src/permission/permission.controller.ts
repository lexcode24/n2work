import { Controller } from '@nestjs/common';
import { BaseController } from '../old_base/base.controller';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController extends BaseController {

  constructor( protected readonly service: PermissionService) {
    super(service);
  }
}
