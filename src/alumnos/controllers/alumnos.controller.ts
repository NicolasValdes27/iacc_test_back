import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { AlumnosService } from '../services/alumnos.service';
import { AlumnoDto } from '../dto/alumno.dto';
import { UpdateAlumnoDto } from '../dto/update-alumno.dto';

@Controller('alumnos')
export class AlumnosController {

    constructor(
        private alumnosService: AlumnosService
    ){}

    @Get()
    async getAll(@Res() res) {
        const response = await this.alumnosService.findAll();
        if(!response.length) {
            return res.status(HttpStatus.ACCEPTED).json({
                message: 'No existen alumnos',
                alumnos: []
            });
        }

        return res.status(HttpStatus.OK).json({
            alumnos: response
        });
    }

    @Get(':id')
    async getOne(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const response = await this.alumnosService.findOne(id);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un alumno con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumno ${id} encontrado`,
            alumno: response
        });
    }

    @Post()
    async create(@Res() res,@Body() body: AlumnoDto) {
        const response = await this.alumnosService.create(body);
        if(!response) {
            return res.status(HttpStatus.BAD_GATEWAY).json({
                message: 'Error',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumno creado!`,
            alumno: response
        });
    }

    @Put(':id')
    async update(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() body: UpdateAlumnoDto) {
        const response = await this.alumnosService.update(id, body);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un alumno con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumno ${id} actualizado`,
            alumno: response
        });
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const response = await this.alumnosService.delete(id);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un alumno con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumno ${id} eliminado`,
        });
    }
}
