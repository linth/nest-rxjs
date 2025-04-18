import { Global, Module } from '@nestjs/common';
import { EventBusService } from './event-bus.service';
import { EventBusController } from './event-bus.controller';

@Global()
@Module({
  controllers: [EventBusController],
  providers: [EventBusService],
  exports: [EventBusService],
})
export class EventBusModule {}
