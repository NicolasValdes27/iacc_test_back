import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCursoDto {

    @IsString()
    @IsOptional()
    nombre: string;

    @IsString()
    @IsOptional()
    codigo: string;

    @IsString()
    @IsOptional()
    anyo: string;

    @IsString()
    @IsOptional()
    semestre: string;

    @IsString()
    @IsOptional()
    sede: string;

    @IsOptional()
    @IsNumber({}, {each: true})
    alumnos: number[];
}