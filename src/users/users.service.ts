import { Injectable } from '@nestjs/common';
import { EventBusService } from 'src/event-bus/event-bus.service';
import { EventNames } from 'src/event-bus/event-names.enum';
import { RxjsEventBusService } from 'src/rxjs-event-bus/rxjs-event-bus.service';


@Injectable()
export class UsersService {
	constructor(
		private readonly eventBus: EventBusService,
		private readonly rxjsEventBus: RxjsEventBusService,
	) {}

	getAllUser() {
		const users = [
      { id: '1', name: 'Alice'},
      { id: '2', name: 'George'},
    ]

    this.eventBus.emit(EventNames.USER_GETALL, users);
		this.rxjsEventBus.emit(EventNames.USER_GETALL, users);
    return users;
	}

	getCacheExpired() {
		const data = {
			key: EventNames.CACHE_EXPIRED,
		}
		this.rxjsEventBus.emit(EventNames.CACHE_EXPIRED, data);
	}
}
