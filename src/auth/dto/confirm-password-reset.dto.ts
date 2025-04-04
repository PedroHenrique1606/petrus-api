import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class ConfirmPasswordResetDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(6, 6)
    code: string

    @IsString()
    @MinLength(6)
    newPassword: string;
}