import {IsArray, IsOptional, IsString} from "class-validator";
import {CreateContactDto} from "../../contact/dto/create-base.dto";

export class CreatePermissionDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    module?: string;

    @IsArray()
    roles: CreateContactDto[];
}

export type UpdatePermissionDto = Partial<CreatePermissionDto>