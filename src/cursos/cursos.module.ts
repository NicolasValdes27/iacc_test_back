import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosService } from './services/cursos.service';
import { CursosController } from './controllers/cursos.controller';
import { Curso } from './entities/curso.entity';
import { AlumnosModule } from 'src/alumnos/alumnos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Curso]), AlumnosModule],
  providers: [CursosService],
  controllers: [CursosController]
})
export class CursosModule {}
