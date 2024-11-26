import {IsArray, IsObject, IsOptional, IsString} from "class-validator";

export class PaginationArgsWithSearchTerm {

    @IsOptional()
    @IsObject()
    filters: any;

    @IsOptional()
    @IsString()
    skip: string;

    @IsOptional()
    @IsString()
    take: string;

    @IsOptional()
    @IsObject()
    orderBy: any;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    groupBy?: string[];
}