import { Module } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { ReunionesController } from './reuniones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reunion } from './entities/reunione.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reunion]), AuthModule],
  controllers: [ReunionesController],
  providers: [ReunionesService],
})
export class ReunionesModule { }
