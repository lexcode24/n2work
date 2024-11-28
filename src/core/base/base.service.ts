import { PrismaService } from '../prisma/prisma.service';
import {buildWhereClause} from "../utils/filter.util";
import {NotFoundException} from "@nestjs/common";

export class BaseService<T> {
    protected readonly prisma: PrismaService;
    protected readonly model: string;

    /*
    * prisma: PrismaService
    * model: string
     */
    constructor(prisma: PrismaService, model: string) {
        this.prisma = prisma;
        this.model = model;
    }

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
    async findAll(filters: any, skip: any, orderBy: any, groupBy: string[], includeRelations?: any ): Promise<any> {
        const where = buildWhereClause(filters);

        skip = parseInt(skip) || 0;
        const take = 50;

        const query: any = {
            where,
            skip,
            take,
            orderBy,
        };

        if (includeRelations) {
            query.include = includeRelations;
        }

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
    findOne(id: number, includeRelations?: any): Promise<T> {
        const query: any = { where: { id } };

        if (includeRelations) {
            query.include = includeRelations;
        }

        const record = this.prisma[this.model].findUnique(query);

        if (!record) throw new NotFoundException(`${this.model} not found`);

        return record;
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