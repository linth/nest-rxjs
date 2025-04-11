import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { EventBusModule } from 'src/event-bus/event-bus.module';

@Module({
  imports: [EventBusModule],
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}
