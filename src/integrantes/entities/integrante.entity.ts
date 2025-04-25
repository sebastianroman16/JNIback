import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Grupo } from '../../grupos/entities/grupo.entity';

@Entity()
export class Integrante {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    correo?: string;

    @Column({ nullable: true })
    telefono?: string;

    @ManyToOne(() => Grupo, grupo => grupo.integrantes, { eager: true })
    grupo: Grupo;
}