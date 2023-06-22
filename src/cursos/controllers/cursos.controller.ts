import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { CursosService } from '../services/cursos.service';
import { AddAlumnosDto, CursoDto } from '../dto/curso.dto';
import { UpdateCursoDto } from '../dto/update-curso.dto';

@Controller('cursos')
export class CursosController {

    constructor(
        private cursosService: CursosService
    ){}

    @Get()
    async getAll(@Res() res) {
        const response = await this.cursosService.findAll();
        if(!response.length) {
            return res.status(HttpStatus.ACCEPTED).json({
                message: 'No existen cursos',
                cursos: []
            });
        }

        return res.status(HttpStatus.OK).json({
            cursos: response
        });
    }

    @Get(':id')
    async getOne(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const response = await this.cursosService.findOne(id);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un curso con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Curso ${id} encontrado`,
            curso: response
        });
    }

    @Get(':id/alumnos')
    async getAlumnosByCurso(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const response = await this.cursosService.findAlumnosByCurso(id);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un curso con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumnos encontrados del curso ${id}`,
            alumnos: response
        });
    }

    @Post()
    async create(@Res() res,@Body() body: CursoDto) {
        const response = await this.cursosService.create(body);
        if(!response) {
            return res.status(HttpStatus.BAD_GATEWAY).json({
                message: 'Error',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Curso creado!`,
            curso: response
        });
    }

    @Post(':id/alumnos')
    async addAlumnos(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() body: AddAlumnosDto) {
        const response = await this.cursosService.addAlumnos(id, body);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un curso con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumnos añadidos al curso ${id}`,
            curso: response
        });
    }

    @Put(':id')
    async update(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() body: UpdateCursoDto) {
        const response = await this.cursosService.update(id, body);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un curso con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Curso ${id} actualizado`,
            curso: response
        });
    }

    
    @Delete(':id/alumnos')
    async deleteAlumnos(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() body: AddAlumnosDto) {
        const response = await this.cursosService.deleteAlumnos(id, body);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un curso con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Alumnos eliminados del curso ${id}`,
            alumnos: body.alumnos
        });
        
    }

    @Delete(':id')
    async delete(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const response = await this.cursosService.delete(id);
        if(!response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No existe un curso con el ID seleccionado',
            });
        }
        return res.status(HttpStatus.OK).json({
            message: `Curso ${id} eliminado`,
        });
    }
}
