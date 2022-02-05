import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.connectMicroservice<MicroserviceOptions>({
     //  transport: Transport.TCP,
     //  options: {
     //    host: '127.0.0.1',
     //    port: 8080,

     transport: Transport.NATS,
     options: {
       servers: ['nats://nats-srv:4222'],
     },
   });
  await app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001, () => {
    console.log("Users listening on port 3001!!!! ");
  });
}
bootstrap();

 