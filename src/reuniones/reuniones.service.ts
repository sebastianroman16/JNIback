import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reunion } from './entities/reunione.entity';
import { CreateReunionDto } from './dto/create-reunione.dto';

@Injectable()
export class ReunionesService {
  constructor(
    @InjectRepository(Reunion)
    private reunionRepo: Repository<Reunion>,
  ) { }

  async crear(dto: CreateReunionDto, grupoNombre: string) {
    const nueva = this.reunionRepo.create({ ...dto, grupoNombre });
    return await this.reunionRepo.save(nueva);
  }

  async listarPorGrupo(grupoNombre: string) {
    console.log('🔎 Filtrando reuniones por grupo:', grupoNombre);
    return await this.reunionRepo.find({ where: { grupoNombre }, order: { fecha: 'DESC' } });
  }

  async listarTodas() {
    return await this.reunionRepo.find({ order: { fecha: 'DESC' } });
  }
}