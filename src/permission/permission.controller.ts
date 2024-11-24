import { Controller } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import {PermissionService} from "./permission.service";

@Controller('permission')
export class PermissionController extends BaseController {
  constructor(service: PermissionService) {
    super(service);
  }
}