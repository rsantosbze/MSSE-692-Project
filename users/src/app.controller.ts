import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { JwtPayload } from './user/interfaces/payload.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @MessagePattern({ cmd: 'greeting' })
  // getGreetingMessage(name: string): string {
  //   return `Hello Doggie ${name}`;
  // }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello  ${name}`;
  }

  @EventPattern('test') // Our topic name
  getHello(@Payload() message) {
    console.log(message);
  }

  // @Get('/greeting')
  // async getHello() {
  //   return this.appService.getHelloAsync();
  // }
}
