import {IsArray, IsEmail, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {CreateRoleDto} from "../../role/dto/create-role";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName: string

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName: string

  @IsArray()
  @IsOptional()
  roles?: CreateRoleDto[]
}

export type UpdateUserDto = Partial<CreateUserDto>