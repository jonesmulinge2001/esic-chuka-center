/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix('api');

  // API versioning
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  // Swagger API Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ESIC STEM LAB API')
    .setDescription(
      `
## ESIC STEM LAB Digital Platform API

The Electronics & Software Innovation Center (ESIC STEM LAB) at Chuka University.

### Authentication
Use Bearer JWT token for protected endpoints. Obtain token via \`POST /api/v1/auth/login\`.

### Roles
- **ADMIN** – Full access to all resources and admin dashboard
- **STAFF** – Content management access  
- **USER** – Registered user access (event registration, project submission, restricted resources)
- **Public** – No auth required for public content
    `,
    )
    .setVersion('1.0')
    .setContact('ESIC STEM LAB', 'https://esic.chuka.ac.ke', 'esic@chuka.ac.ke')
    .setLicense('MIT', '')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addTag('Auth', 'Authentication & authorization')
    .addTag('Users', 'User management')
    .addTag('Programs', 'STEM programs')
    .addTag('Projects', 'Projects & research showcase')
    .addTag('Project Submissions', 'User project submissions')
    .addTag('Events', 'Events & workshops')
    .addTag('Resources', 'Learning resources portal')
    .addTag('Partners', 'Partners & collaborations')
    .addTag('Gallery', 'Media gallery')
    .addTag('Announcements', 'News & announcements')
    .addTag('Team', 'Team members')
    .addTag('Contact', 'Contact messages')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
    customSiteTitle: 'ESIC STEM LAB API Docs',
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  console.log(`🚀 ESIC API running on: http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger docs at:     http://localhost:${port}/api/docs`);
}

bootstrap();