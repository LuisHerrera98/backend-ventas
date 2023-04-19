import { IsString, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    @MinLength(1)
    business_name: string;

    @IsString()
    @MinLength(1)
    email: string;

    @MinLength(6)
    password: string;
}
