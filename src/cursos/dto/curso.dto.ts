import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CursoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    anyo: string;

    @IsString()
    @IsNotEmpty()
    semestre: string;

    @IsString()
    @IsNotEmpty()
    sede: string;

    @IsOptional()
    @IsNumber({}, {each: true})
    alumnos: number[];
}

export class AddAlumnosDto {
    @IsNotEmpty()
    @IsNumber({}, {each: true})
    alumnos: number[];
}