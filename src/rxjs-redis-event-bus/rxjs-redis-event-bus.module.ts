import { Global, Module } from '@nestjs/common';
import { RxjsRedisEventBusService } from './rxjs-redis-event-bus.service';
import { RxjsRedisEventBusController } from './rxjs-redis-event-bus.controller';
import { CacheExpiredHandler } from './event-handler/cache.handler';
import { UserHandler } from './event-handler/user.handler';
import { RedisEventHandler } from './event-handler/redis-event-handler.interface';
import { REDIS_EVENT_HANDLERS } from './tokens';

@Global()
@Module({
  controllers: [RxjsRedisEventBusController],
  providers: [
    RxjsRedisEventBusService,
    UserHandler,
    CacheExpiredHandler,
    {
      provide: REDIS_EVENT_HANDLERS,
      useFactory: (...handlers: RedisEventHandler<any, any>[]) => handlers,
      inject: [
        UserHandler, 
        CacheExpiredHandler,
      ],
    }
  ],
  exports: [RxjsRedisEventBusService],
})
export class RxjsRedisEventBusModule {}
