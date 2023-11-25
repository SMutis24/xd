import { IsString, Matches, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @MinLength(1)
    name: string;


    @IsString()
    @MinLength(1)
    description: string;


    @IsString()
    @MinLength(1)
    status: string;


    @IsString()
    @MinLength(1)
    owner: string;


    @IsString()
    @MinLength(1)
    assigned: string;

    @IsString()
    due_date: string;
}
