import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  //constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

  // async getHello() {
  //   return this.client.send({ cmd: 'greeting' }, 'Progressive Coder ASSET');
  // }

  // async getHelloAsync() {
  //   const message = await this.client.send(
  //     { cmd: 'greeting-async' },
  //     'Progressive Coder ASSET',
  //   );
  //   return message;
  // }
}
