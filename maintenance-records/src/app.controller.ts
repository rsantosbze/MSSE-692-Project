import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/greeting')
  // async getHello() {
  //   return this.appService.getHello();
  // }

  // @Get('/greeting-async')
  // async getHelloAsync() {
  //   return this.appService.getHelloAsync();
  // }

  @MessagePattern({ cmd: 'belize' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello ${name}`;
  }
}
