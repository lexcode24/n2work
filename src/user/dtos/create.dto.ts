import {IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {Role} from "@prisma/client";

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

  @IsOptional()
  role?: Role
}

export type UpdateUserDto = Partial<CreateUserDto>