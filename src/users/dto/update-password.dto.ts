import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({ example: 'nova senha' })
    @IsString()
    @MinLength(6)
    password: string;
}