import { IsArray, IsBoolean, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CreateReunionDto {
    @IsNumber()
    @Min(0)
    numeroAsistentes: number;

    @IsBoolean()
    contactoDuranteSemana: boolean;

    @IsString()
    mejoraProxima: string;

    @IsArray()
    @IsString({ each: true })
    asistentes: string[];
}