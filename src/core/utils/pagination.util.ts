import {IsOptional, IsString} from "class-validator";

export class PaginationArgs {
    @IsString()
    @IsOptional()
    skip?: string;

    @IsString()
    @IsOptional()
    take?: string;
}

export class PaginationArgsWithSearchTerm extends PaginationArgs {
    @IsString()
    @IsOptional()
    searchTerm?: string;
}

export function isHasMorePagination(
    totalCount: number,
    skip?: string,
    take?: string
): boolean {
    return totalCount > (parseInt(skip) || 0) + (parseInt(take) || 0);
}