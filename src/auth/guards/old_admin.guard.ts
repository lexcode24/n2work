import {CanActivate, ExecutionContext, ForbiddenException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";
import {Role, User} from "@prisma/client";
import {Request} from "express";

export class OnlyAdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest<Request>()
        const user = request.user as User

        /*if(user.roles.length) {
            throw new ForbiddenException('Nicht genügend Rechte')
        }*/

        return true
    }
}