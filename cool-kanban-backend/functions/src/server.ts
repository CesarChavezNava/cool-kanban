import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';

const server = express();

const createNestServer = async expressInstance => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  return app.init();
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch(error => console.error('Nest broken', error));

export { server };
