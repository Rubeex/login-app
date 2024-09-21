import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO {
    
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsDateString()
    birthdate:string;
    
}
