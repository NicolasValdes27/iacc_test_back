import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlumnoDto {

    @IsString()
    @IsOptional()
    nombre: string;

    @IsString()
    @IsOptional()
    apellido: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsNumber()
    @IsOptional()
    edad: number;

    @IsString()
    @IsOptional()
    direccion: string;
}