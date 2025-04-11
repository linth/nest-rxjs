import { Controller, OnModuleInit } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { EventBusService } from 'src/event-bus/event-bus.service';


@Controller('monitor')
export class MonitorController {}
