import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Curso } from '../entities/curso.entity';
import { AddAlumnosDto, CursoDto } from '../dto/curso.dto';
import { UpdateCursoDto } from '../dto/update-curso.dto';
import { AlumnosService } from 'src/alumnos/services/alumnos.service';
import { Alumno } from 'src/alumnos/entities/alumno.entity';

@Injectable()
export class CursosService {

    constructor(
        @InjectRepository(Curso) private cursosRepository: Repository<Curso>,
        private alumnosService: AlumnosService
    ){}

    async findAll() {
        return await this.cursosRepository.find();
    }

    async findOne(id: number) {
        return await this.cursosRepository.findOneBy({id});
    }

    async findAlumnosByCurso(id: number) {
        try {
            const curso = await this.findOne(id);
            if(!curso) {
                return null;
            }
            if(!curso.alumnos?.length) {
                return [];
            }
            const alumnos = await this.alumnosService.findAll();
            const finalList: Alumno[] = alumnos.filter(alumno => curso.alumnos.includes(alumno.id));
            return finalList;
        } catch (error) {
            console.log(error);
        }
    }

    create(body: CursoDto) {
        try {
            const nuevoCurso = this.cursosRepository.create(body)
            return this.cursosRepository.save(nuevoCurso);
        } catch (error) {
            console.log(error);
        }
    }

    async update(id: number, body: UpdateCursoDto) {
        try {
            const curso = await this.findOne(id);
            if(!curso) {
                return null;
            }
            this.cursosRepository.merge(curso, body);
            return this.cursosRepository.save(curso);
        } catch (error) {
            console.log(error);
        }
    }

    async addAlumnos(id: number, body: AddAlumnosDto) {
        try {
            const curso = await this.findOne(id);
            if(!curso) {
                return null;
            }
            if(!curso.alumnos) {
                curso.alumnos = body.alumnos
            } else {
                curso.alumnos = [...curso.alumnos, ...body.alumnos]
            }
            return this.cursosRepository.save(curso);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAlumnos(id: number, body: AddAlumnosDto) {
        try {
            const curso = await this.findOne(id);
            if(!curso) {
                return null;
            }
            const finalList = curso.alumnos.filter((alumnoId: number) => !body.alumnos.includes(alumnoId))
            curso.alumnos = finalList;
            return this.cursosRepository.save(curso);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id: number) {
        try {
            const res = await this.cursosRepository.delete({id});
            return res.affected;
        } catch (error) {
            console.log(error);
        }
    }
}
