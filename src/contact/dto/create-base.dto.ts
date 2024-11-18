import {CreateBaseDto} from "../../base/dto/create-base.dto";
import {IsEmail, IsPhoneNumber, IsString} from "class-validator";

export class CreateContactDto implements CreateBaseDto {
    @IsString()
    name: string;

    @IsEmail()
    email?: string;

    @IsPhoneNumber()
    phone?: string;

    @IsString()
    message?: string;
}