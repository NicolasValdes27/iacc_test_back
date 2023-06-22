import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Curso {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    anyo: string;

    @Column()
    semestre: string;

    @Column()
    sede: string;

    @Column("int", { array: true, nullable: true })
    alumnos: number[];
}