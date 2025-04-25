import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntegrantesService {
  constructor(
    @InjectRepository(Integrante)
    private integranteRepo: Repository<Integrante>,

    @InjectRepository(Grupo)
    private grupoRepo: Repository<Grupo>
  ) { }

  async crearIntegrante(nombre: string, correo: string, grupoId: string) {
    const grupo = await this.grupoRepo.findOneBy({ id: grupoId });
    if (!grupo) throw new NotFoundException('Grupo no encontrado');

    const integrante = this.integranteRepo.create({ nombre, correo, grupo });
    return this.integranteRepo.save(integrante);
  }

  async crearIntegranteConGrupoPorNombre(nombre: string, correo: string | undefined, nameGroup: string) {
    try {
      console.log('📥 Nombre recibido:', nombre);
      console.log('📧 Correo recibido:', correo);
      console.log('🏷️ Grupo recibido:', nameGroup);

      const grupo = await this.grupoRepo.findOne({ where: { nombre: nameGroup } });

      if (!grupo) {
        console.error('❌ Grupo no encontrado:', nameGroup);
        throw new NotFoundException('Grupo no encontrado');
      }

      const integrante = this.integranteRepo.create({ nombre, correo, grupo });

      console.log('🛠️ Guardando integrante:', integrante);

      const saved = await this.integranteRepo.save(integrante);
      console.log('✅ Integrante guardado:', saved);

      return saved;
    } catch (error) {
      console.error('🔥 Error al crear integrante:', error); // <--- ESTO TE VA A DECIR EL ERROR REAL
      throw new InternalServerErrorException('No se pudo crear el integrante');
    }
  }

  async listarPorGrupo(grupoId: string) {
    return this.integranteRepo.find({ where: { grupo: { id: grupoId } } });
  }
}