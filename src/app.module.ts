import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosModule } from './cursos/cursos.module';
import { AlumnosModule } from './alumnos/alumnos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgpass',
      database: 'iacc_test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    CursosModule,
    AlumnosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
