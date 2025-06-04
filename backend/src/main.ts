import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API agendamento de consultas')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Autenticação', 'Operações relacionadas à autenticação de usuários')
    .addTag('Médicos')
    .addTag('Especialidades')
    .addTag('Grades', 'Operações relacionadas aos horários dos médicos')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
