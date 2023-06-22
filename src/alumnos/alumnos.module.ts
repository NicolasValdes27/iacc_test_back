import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosService } from './services/alumnos.service';
import { AlumnosController } from './controllers/alumnos.controller';
import { Alumno } from './entities/alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  providers: [AlumnosService],
  controllers: [AlumnosController],
  exports: [AlumnosService]
})
export class AlumnosModule {}
