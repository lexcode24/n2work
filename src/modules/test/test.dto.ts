import {IsDate, IsOptional, IsString} from "class-validator";

export class CreateTestDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
}