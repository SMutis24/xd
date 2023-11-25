import { IsEmail, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {


    @IsString()
    @MinLength(5)
    user: string;

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @MinLength(4)
    lastname: string;

    @IsString()
    @MinLength(7)
    @IsStrongPassword()
    password: string;
  
    @IsString()
    @MinLength(9)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @IsOptional()
    telephone?: string;
}
