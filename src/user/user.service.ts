import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {hash} from "argon2";
import {CreateUserDto, UpdateUserDto} from "./dtos/create.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: number) {
        const user = this.prisma.user.findUnique({
            where: { id }
        })

        if(!user) throw new NotFoundException('User not found')

        return user
    }

    async findByEmail(email: string) {
        const user = this.prisma.user.findUnique({
            where: { email }
        })

        if(!user) throw new NotFoundException('User not found')

        return user
    }

    /*async findAll(args?: PaginationArgsWithSearchTerm): Promise<UserResponse> {
        const searchTermQuery = args?.searchTerm
        ? this.getSearchTermFilter(args?.searchTerm)
        : {}

        const users = await this.prisma.user.findMany({
            skip: +args?.skip,
            take: +args?.take,
            where: searchTermQuery,
        })

        const totalCount = await this.prisma.user.count({where: searchTermQuery})

        const isHasMore = isHasMorePagination(totalCount, args?.skip, args?.take)

        return { items: users, isHasMore }
    }*/


    async create({ password, ...dto}: CreateUserDto) {
        const user = {
            ...dto,
            password: await hash(password)
        }

        return this.prisma.user.create({ data: user })
    }

    async update(id: number, { password, ...data }: UpdateUserDto) {
        await this.findById(id)

        const hashedPassword = password ? { password: await hash(password)} : {}

        return this.prisma.user.update({
            where: { id },
            data: { ...data, ...hashedPassword }
        })
    }
}
