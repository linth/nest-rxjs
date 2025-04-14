import { Injectable } from '@nestjs/common';
import { EventBusService } from 'src/event-bus/event-bus.service';
import { EventNames } from 'src/event-bus/event-names.enum';
import { RxjsRedisEventBusService } from 'src/rxjs-redis-event-bus/rxjs-redis-event-bus.service';


@Injectable()
export class UsersService {
	constructor(
		private readonly eventBus: EventBusService,
		private readonly rxjsRedisEventBus: RxjsRedisEventBusService,
	) {}

	getAllUser() {
		const users = [
      { id: '1', name: 'Alice'},
      { id: '2', name: 'George'},
    ]

    this.eventBus.emit(EventNames.USER_GETALL, users);
		this.rxjsRedisEventBus.emit(EventNames.USER_GETALL, users);
    return users;
	}
}
