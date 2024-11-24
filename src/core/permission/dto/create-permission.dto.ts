import {IsArray, IsOptional, IsString} from "class-validator";
import {CreateRoleDto} from "../../role/dto/create-role";

export class CreatePermissionDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    module?: string;

    @IsArray()
    roles: CreateRoleDto[];
}

export type UpdatePermissionDto = Partial<CreatePermissionDto>