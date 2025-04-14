import { Module } from '@nestjs/common';
import { RxjsRedisEventBusService } from './rxjs-redis-event-bus.service';
import { RxjsRedisEventBusController } from './rxjs-redis-event-bus.controller';

@Module({
  controllers: [RxjsRedisEventBusController],
  providers: [RxjsRedisEventBusService],
})
export class RxjsRedisEventBusModule {}
