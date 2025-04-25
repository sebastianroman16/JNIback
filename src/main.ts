// @ts-nocheck
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableCors();

  const port = process.env.PORT || 3001;

  await app.listen(port);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();