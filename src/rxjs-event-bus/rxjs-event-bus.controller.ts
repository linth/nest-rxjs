import { Controller } from '@nestjs/common';
import { RxjsEventBusService } from './rxjs-event-bus.service';

@Controller('rxjs-redis-event-bus')
export class RxjsEventBusController {
  constructor(private readonly rxjsEventBusService: RxjsEventBusService) {}
}
