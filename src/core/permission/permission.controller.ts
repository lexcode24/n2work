import {Controller, Get, Query} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import {PermissionService} from "./permission.service";
import {PaginationArgsWithSearchTerm} from "../utils/pagination.util";

@Controller('permissions')
export class PermissionController extends BaseController {
  constructor(service: PermissionService) {
    super(service);
  }

  @Get()
  findAll(@Query() params: PaginationArgsWithSearchTerm ) {
    const includeRelations = {
      roles: {
        include: {
          role: true
        }
      }
    }
    return super.findAll(params, includeRelations);
  }
}