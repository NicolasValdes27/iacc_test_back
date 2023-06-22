import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlumnoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    edad: number;

    @IsString()
    @IsNotEmpty()
    direccion: string;
}