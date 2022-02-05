import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { transpileModule } from '@ts-morph/common/lib/typescript';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    // transport: Transport.TCP,
    // options: {
    //   host: '127.0.0.1',
    //   port: 8081,
    // },

    transport: Transport.NATS,
    options: {
      servers: 'nats://nats-srv:4222'
    }
  });
  await app.startAllMicroservices();
   await app.listen(3003, () => {
     console.log('Maintenance Records listening on port 3003!');
   });
}
bootstrap();
