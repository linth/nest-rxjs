import { Controller } from '@nestjs/common';
import { EventBusService } from './event-bus.service';

@Controller('event-bus')
export class EventBusController {
  constructor(private readonly eventBusService: EventBusService) {}
}
