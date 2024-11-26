import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import {BaseModule} from "../base/base.module";
import {RoleController} from "./role.controller";

@Module({
    imports: [BaseModule.register(RoleService)],
    controllers: [RoleController],
})
export class RoleModule {}
