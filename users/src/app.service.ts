import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  // constructor(@Inject('BELIZE_SERVICE') private client: ClientProxy) {}

  // async getHello() {
  //   return this.client.send({ cmd: 'greeting' }, 'Progressive Coder');
  // }

  // async getHelloAsync() {
  //   const message = await this.client.send(
  //     { cmd: 'belize' },
  //     'Progressive Coder USER',
  //   );
  //   return message;
  // }
}
