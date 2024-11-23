import { PrismaService } from '../prisma/prisma.service';

export class BaseService<T> {
    constructor(private readonly prisma: PrismaService, private readonly model: string) {}

    create(data: T): Promise<T> {
        return this.prisma[this.model].create({ data });
    }

    findAll(): Promise<T[]> {
        return this.prisma[this.model].findMany();
    }

    findOne(id: number): Promise<T> {
        return this.prisma[this.model].findUnique({ where: { id } });
    }

    update(id: number, data: Partial<T>): Promise<T> {
        return this.prisma[this.model].update({ where: { id }, data });
    }

    delete(id: number): Promise<T> {
        return this.prisma[this.model].delete({ where: { id } });
    }
}