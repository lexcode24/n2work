import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import {PrismaService} from "../prisma.service";
import {isHasMorePagination, PaginationArgsWithSearchTerm} from "../utils/pagination.util";
import {Prisma} from "@prisma/client";

@Injectable()
export class BaseService {

  protected readonly model;

  constructor(protected readonly prisma: PrismaService){
    this.model = this.prisma.base;
  }

  async create(createBaseDto: CreateBaseDto) {
    return await this.model.create({data: createBaseDto});
  }

  async findAll(args?: PaginationArgsWithSearchTerm ) {
    const searchTermQuery = args?.searchTerm
        ? this.getSearchTermFilter(args?.searchTerm)
        : {}

    const skip = args?.skip ?? 0;
    const take = args?.take ?? 10;


    const items = await this.model.findMany({
      skip: +skip,
      take: +take,
      where: searchTermQuery
    });

    const totalCount = await this.model.count({where: searchTermQuery});

    const isHasMore = isHasMorePagination(totalCount, args?.skip, args?.take);

    return {items, isHasMore};
  }

  async findOne(id: number) {
    const item = await this.model.findFirst({where: {id}});
    if(!item) throw new NotFoundException('Record not found');
    return item;
  }

  async update(id: number, updateBaseDto: UpdateBaseDto) {
    const item = await this.model.update({
        where: {id},
        data: updateBaseDto
    });
    return item;
  }

  async remove(id: number) {
    return await this.model.delete({where: {id}});
  }

  private getSearchTermFilter(searchTerm: string): Prisma.BaseWhereInput {
      return {
        OR: [
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
        ]
      }
  }
}
