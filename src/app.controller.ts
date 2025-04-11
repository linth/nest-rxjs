import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedService } from './shared/shared.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sharedService: SharedService,
  ) {}

  @Get()
  getHello(): string {
    this.sharedService.emitValue('it\'s come from getHello().');
    return this.appService.getHello();
  }
}
