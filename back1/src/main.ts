import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as express from 'express';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    bodyParser: false  // Disable built-in body parser
  });
  
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3002;
  const environment = configService.get('NODE_ENV') || 'development';

  // Webhook endpoint middleware
  // Configure raw body handling for webhooks
  app.use('/api/webhooks/gocardless', express.raw({ 
    type: 'application/json',
    verify: (req: any, _res, buf) => {
      // Store raw body buffer for signature verification
      req.rawBody = buf;
    }
  }));
  
  // Regular JSON parsing for other routes
  app.use(express.json());

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(
    `Application is running on: http://localhost:${port}/api`,
    'Bootstrap'
  );
  Logger.log(
    `Environment: ${environment}`,
    'Bootstrap'
  );
}
bootstrap();
