import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Reunion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    fecha: Date;

    @Column()
    numeroAsistentes: number;

    @Column()
    contactoDuranteSemana: boolean;

    @Column('text')
    mejoraProxima: string;

    @Column('simple-array')
    asistentes: string[];

    @Column()
    grupoNombre: string;
}