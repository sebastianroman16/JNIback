import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';

import { IntegrantesService } from './integrantes.service';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('integrantes')
export class IntegrantesController {
  constructor(private readonly integrantesService: IntegrantesService) { }

  @Post()
  @Auth(ValidRoles.user, ValidRoles.admin)
  async crear(@Body() dto: CreateIntegranteDto, @Req() req: any) {
    console.log('📥 DTO recibido:', dto);
    console.log('👤 Usuario autenticado:', req.user);

    const nameGroup = req.user?.nameGroup;
    if (!nameGroup) {
      console.error('❌ No se encontró nameGroup en el token');
      throw new Error('nameGroup is required');
    }

    return this.integrantesService.crearIntegranteConGrupoPorNombre(
      dto.nombre,
      dto.correo,
      nameGroup
    );
  }
}