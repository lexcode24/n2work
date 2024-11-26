import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateContactDto {

    @IsOptional()
    @IsString()
    displayName: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString({message: 'Invalid phone number'})
    phone?: string;

    @IsOptional()
    @IsString()
    mobile?: string;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}