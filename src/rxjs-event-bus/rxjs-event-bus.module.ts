import { Global, Module } from '@nestjs/common';
import { CacheExpiredHandler } from './event-handler/cache.handler';
import { UserHandler } from './event-handler/user.handler';
import { REDIS_EVENT_HANDLERS } from './tokens';
import { RxjsEventBusController } from './rxjs-event-bus.controller';
import { RxjsEventBusService } from './rxjs-event-bus.service';

@Global()
@Module({
  controllers: [RxjsEventBusController],
  providers: [
    RxjsEventBusService,
    UserHandler,
    CacheExpiredHandler,
    {
      provide: REDIS_EVENT_HANDLERS,
      useFactory: (...handlers) => handlers,
      inject: [
        UserHandler, 
        CacheExpiredHandler,
      ],
    }
  ],
  exports: [RxjsEventBusService],
})
export class RxjsEventBusModule {}
