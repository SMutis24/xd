import {IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class LoginUserDto {


    // @IsString()
    // @MinLength(5)
    // user: string;

    @IsString()
    @MinLength(7)
    @IsStrongPassword()
    password: string;
  
    @IsString()
    @MinLength(6)
    @IsEmail()
    email: string;
}
