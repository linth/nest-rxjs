import { Controller } from '@nestjs/common';
import { RxjsRedisEventBusService } from './rxjs-redis-event-bus.service';

@Controller('rxjs-redis-event-bus')
export class RxjsRedisEventBusController {
  constructor(private readonly rxjsRedisEventBusService: RxjsRedisEventBusService) {}
}
