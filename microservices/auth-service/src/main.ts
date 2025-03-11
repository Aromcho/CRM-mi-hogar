import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'; // ✅ Importación correcta

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser()); // ✅ Habilitar el uso de cookies

  app.enableCors({
    origin: 'http://localhost:5173', // Ajusta según tu frontend
    credentials: true, // 🔥 Necesario para permitir cookies en CORS
  });

  await app.listen(4003);
}
bootstrap();
