import { Controller, Post, Body, Get, Req, Query, UseGuards } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { CreateReunionDto } from './dto/create-reunione.dto';

@Controller('reuniones')
export class ReunionesController {
  constructor(private readonly reunionesService: ReunionesService) { }

  @Post()
  @Auth(ValidRoles.user)
  async crear(@Body() dto: CreateReunionDto, @Req() req: any) {
    const grupoNombre = req.user.nameGroup;
    return this.reunionesService.crear(dto, grupoNombre);
  }

  @Get('mias')
  @Auth(ValidRoles.user)
  async misReuniones(@Req() req: any) {
    const grupoNombre = req.user.nameGroup;
    return this.reunionesService.listarPorGrupo(grupoNombre);
  }

  @Get('admin')
  @Auth(ValidRoles.admin)
  async verAdmin(@Query('grupo') grupo?: string) {
    if (grupo) {
      return this.reunionesService.listarPorGrupo(grupo);
    }
    return this.reunionesService.listarTodas();
  }
}