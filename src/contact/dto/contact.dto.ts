import {CreateBaseDto} from "../../base/dto/create-base.dto";
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateContactDto implements CreateBaseDto {

    @IsOptional()
    @IsString()
    displayName: string;

    @IsString()
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