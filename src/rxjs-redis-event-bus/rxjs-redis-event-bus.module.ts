import { Global, Module } from '@nestjs/common';
import { RxjsRedisEventBusService } from './rxjs-redis-event-bus.service';
import { RxjsRedisEventBusController } from './rxjs-redis-event-bus.controller';

@Global()
@Module({
  controllers: [RxjsRedisEventBusController],
  providers: [RxjsRedisEventBusService],
  exports: [RxjsRedisEventBusService],
})
export class RxjsRedisEventBusModule {}
