import { PrismaService } from '../prisma/prisma.service';
import {Inject} from "@nestjs/common";
import {buildWhereClause} from "../utils/filter.util";

export class BaseService<T> {
    /*
    * prisma: PrismaService
    * model: string
     */
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService,
        private readonly model: string) {}

    /*
    * data: any
     */
    create(data: T): Promise<T> {
        return this.prisma[this.model].create({ data });
    }

    /*
    * filters: any
    * skip: any
    * orderBy: any
    * groupBy: string[] (optional)
     */
    async findAll(filters: any, skip: any, orderBy: any, groupBy: string[] ): Promise<any> {
        const where = buildWhereClause(filters);

        skip = parseInt(skip) || 0;
        const take = 50;

        const query: any = {
            where,
            skip,
            take,
            orderBy,
        };

        if (groupBy) {
            query.groupBy = groupBy;
        }

        const [items, totalCount] = await Promise.all([
            this.prisma[this.model].findMany(query),
            this.prisma[this.model].count({ where })
        ]);

        return {
            items,
            count: items.length,
            skip,
            next: skip + items.length < totalCount
        };
    }

    /*
    * id: number
     */
    findOne(id: number): Promise<T> {
        return this.prisma[this.model].findUnique({ where: { id } });
    }

    /*
    * id: number
    * data: Partial<T>
     */
    update(id: number, data: Partial<T>): Promise<T> {
        return this.prisma[this.model].update({ where: { id }, data });
    }

    /*
    * id: number
     */
    delete(id: number): Promise<T> {
        return this.prisma[this.model].delete({ where: { id } });
    }
}