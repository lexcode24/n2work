import {Controller, Get, Param} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {RoleService} from "./role.service";

@Controller('roles')
export class RoleController extends BaseController {
    constructor(service: RoleService) {
        super(service);
    }

    @Get(':id')
    async findOne(@Param() id: number) {
        const includeRelations = {
            permissions: {
                include: {
                    permission: true
                }
            }
        };
        return super.findOne(parseInt(id['id']), includeRelations);
    }
}
