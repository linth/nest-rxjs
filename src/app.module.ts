import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { OtherModule } from './other/other.module';
import { EventBusModule } from './event-bus/event-bus.module';
import { UsersModule } from './users/users.module';
import { MonitorModule } from './monitor/monitor.module';
import { RxjsRedisEventBusModule } from './rxjs-redis-event-bus/rxjs-redis-event-bus.module';


@Module({
  imports: [
    SharedModule,
    OtherModule,
    EventBusModule,
    UsersModule,
    MonitorModule,
    RxjsRedisEventBusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
