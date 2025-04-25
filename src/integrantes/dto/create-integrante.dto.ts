import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateIntegranteDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsEmail()
    correo?: string;

    @IsOptional()
    @IsString()
    telefono?: string;
}