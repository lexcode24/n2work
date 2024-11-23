import {IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateContactDto {

    @IsOptional()
    @IsString()
    displayName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
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

export class UpdateContactDto extends PartialType(CreateContactDto) {}