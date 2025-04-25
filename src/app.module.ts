// @ts-nocheck
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IntegrantesModule } from './integrantes/integrantes.module';
import { GruposModule } from './grupos/grupos.module';
import { ReunionesModule } from './reuniones/reuniones.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    IntegrantesModule,
    GruposModule,
    ReunionesModule,
  ],
})
export class AppModule { }
