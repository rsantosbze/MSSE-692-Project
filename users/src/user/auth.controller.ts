import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @MessagePattern({ cmd: 'greeting' })
  // getGreetingMessage(name: string): string {
  //   return `Hello Doggie ${name}`;
  // }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello  ${name}`;
  }

  // Message receiver from other services to validate the JWT token/User
  @MessagePattern({ cmd: 'validate-user' })
  async validateUserAysnc(payload: JwtPayload): Promise<any> {
    return this.authService.validateUser(payload);
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
