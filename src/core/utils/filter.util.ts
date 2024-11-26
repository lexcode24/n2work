import { Prisma } from '@prisma/client';

export function buildWhereClause(filters: any): Prisma.PrismaClientKnownRequestError {
    const where: any = {};

    for (const key in filters) {
        if (typeof filters[key] === 'object' && !Array.isArray(filters[key])) {
            if (filters[key].eq !== undefined) {
                where[key] = parseValue(filters[key].eq);
            } else if (filters[key].ne !== undefined) {
                where[key] = { not: parseValue(filters[key].ne) };
            } else if (filters[key].ilike !== undefined) {
                where[key] = { contains: filters[key].ilike, mode: 'insensitive' };
            } else if (filters[key].notIlike !== undefined) {
                where[key] = { not: { contains: filters[key].notIlike, mode: 'insensitive' } };
            } else if (filters[key].in !== undefined) {
                where[key] = { in: Array.isArray(filters[key].in) ? filters[key].in.map(parseValue) : [parseValue(filters[key].in)] };
            } else if (filters[key].notIn !== undefined) {
                where[key] = { notIn: Array.isArray(filters[key].notIn) ? filters[key].notIn.map(parseValue) : [parseValue(filters[key].notIn)] };
            } else if (filters[key].set !== undefined) {
                where[key] = { not: null };
            } else if (filters[key].notSet !== undefined) {
                where[key] = null;
            } else {
                where[key] = buildWhereClause(filters[key]);
            }
        } else if (typeof filters[key] === 'string' || typeof filters[key] === 'boolean' || typeof filters[key] === 'number') {
            where[key] = parseValue(filters[key]);
        } else {
            where[key] = filters[key];
        }
    }

    return where;
}

function parseValue(value: any): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(value) && value !== null && value !== '') return Number(value);
    return value;
}