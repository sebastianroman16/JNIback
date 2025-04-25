import { Module } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { IntegrantesController } from './integrantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Integrante, Grupo]), AuthModule],
  controllers: [IntegrantesController],
  providers: [IntegrantesService],
})
export class IntegrantesModule { }
