import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Alumno } from '../entities/alumno.entity';
import { AlumnoDto } from '../dto/alumno.dto';
import { UpdateAlumnoDto } from '../dto/update-alumno.dto';

@Injectable()
export class AlumnosService {

    constructor(
        @InjectRepository(Alumno) private alumnosRepository: Repository<Alumno>
    ){}

    async findAll() {
        return await this.alumnosRepository.find();
    }

    async findOne(id: number) {
        return await this.alumnosRepository.findOneBy({id});
    }

    create(body: AlumnoDto) {
        try {
            const nuevoAlumno = this.alumnosRepository.create(body)
            return this.alumnosRepository.save(nuevoAlumno);
        } catch (error) {
            console.log(error);
        }
    }

    async update(id: number, body: UpdateAlumnoDto) {
        try {
            const alumno = await this.findOne(id);
            if(!alumno) {
                return null;
            }
            this.alumnosRepository.merge(alumno, body);
            return this.alumnosRepository.save(alumno)
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id: number) {
        try {
            const res = await this.alumnosRepository.delete({id});
            return res.affected;
        } catch (error) {
            console.log(error);
        }
    }
}
