import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Integrante } from '../../integrantes/entities/integrante.entity';

@Entity()
export class Grupo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nombre: string;

    @OneToMany(() => Integrante, integrante => integrante.grupo)
    integrantes: Integrante[];
}