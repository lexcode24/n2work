import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {PrismaService} from "../../prisma/prisma.service";
import {Request} from "express";
import {User} from "@prisma/client";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permission = this.reflector.get<string>('permission', context.getHandler());
        const request = context.switchToHttp().getRequest<Request>()
        const user = request.user as User

        if(!user) {
            return false;
        }

        if(!permission) {
            return true;
        }

        let perm = await this.prisma.permission.findUnique({where: {name: permission}});
        if (!perm) {
            const modulName = permission.split('.')[0] || '';
            perm = await this.prisma.permission.create({
                data: { name: permission, module: modulName, roles: { create: [
                        { role: { connect: { id: 1 } } }
                    ] } }
            });
        }

        const userRoles = await this.prisma.user.findUnique({
            where: { id: user.id },
            include: { roles: { include: { role: { include: { permissions: true } } } } }
        });


        if (!userRoles) {
            throw new ForbiddenException('Access denied');
        }

        const hasPermission = userRoles.roles.some((role) => {
            return role.role.permissions.some((p) => {
                return p.permissionId === perm.id
            })
        });

        if (!hasPermission) {
            throw new ForbiddenException('Access denied');
        }

        return true;

    }
}