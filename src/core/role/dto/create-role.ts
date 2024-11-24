import { IsArray, IsOptional, IsString } from 'class-validator';
import {CreatePermissionDto} from "../../permission/dto/create-permission.dto";
import {CreateUserDto} from "../../user/dtos/create.dto";

export class CreateRoleDto {
    id: number;

    @IsString()
    name: string;

    @IsArray()
    @IsOptional()
    permissions?: CreatePermissionDto[];

    @IsArray()
    @IsOptional()
    users?: CreateUserDto[];
}

export type UpdateRoleDto = Partial<CreateRoleDto>