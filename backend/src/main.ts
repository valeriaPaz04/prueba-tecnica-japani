import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Hace que TODOS los DTOs (como QueryProductsDto) se
  // validen automáticamente antes de llegar a cualquier controller.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // convierte los strings de la URL a los tipos del DTO
      whitelist: true, // ignora cualquier query param que no esté en el DTO
    }),
  );

  // Se habilita el puerto del frontend para que las peticiones lleguen
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
