import {IsOptional, IsString} from "class-validator";

export class OrderByArgs {
    @IsString()
    @IsOptional()
    field?: string;

    @IsString()
    @IsOptional()
    order?: 'ASC' | 'DESC';
}