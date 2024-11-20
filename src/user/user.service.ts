import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'argon2';
import { CreateUserDto, UpdateUserDto } from './dtos/create.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async create({ password, roles, ...dto }: CreateUserDto) {
        const user = {
            ...dto,
            password: await hash(password),
            roles: {
                connect: roles?.map(role => ({ roleId_userId: { roleId: role.id, userId: 0 } })) || []
            }
        };

        return this.prisma.user.create({ data: user });
    }

    async update(id: number, { password, roles, ...data }: UpdateUserDto) {
        await this.findById(id);

        const hashedPassword = password ? { password: await hash(password) } : {};

        return this.prisma.user.update({
            where: { id },
            data: {
                ...data,
                ...hashedPassword,
                roles: {
                    set: roles?.map(role => ({ roleId_userId: { roleId: role.id, userId: id } })) || []
                }
            }
        });
    }
}