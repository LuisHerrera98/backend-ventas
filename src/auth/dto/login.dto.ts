import { IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsString()
    @MinLength(1)
    email: string;

    @MinLength(6)
    password: string;
}
