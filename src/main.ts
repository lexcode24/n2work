import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Entfernt Felder, die nicht im DTO definiert sind
        forbidNonWhitelisted: true, // Löst Fehler aus, wenn unerlaubte Felder gesendet werden
        transform: true, // Transformiert Payloads in DTO-Klassen
      }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
