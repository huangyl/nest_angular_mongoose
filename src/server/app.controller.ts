import { Controller, Get,Query } from '@nestjs/common';
@Controller('/api')
export class AppController {
  constructor() {}
  @Get()
  get(){
      return 'hello'
  }
}
