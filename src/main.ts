import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
      enableImplicitConversion:true
    }
    })
  );

  await app.listen(process.env.app_port);
}
bootstrap();
