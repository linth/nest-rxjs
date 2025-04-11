import { Injectable } from '@nestjs/common';
import { EventBusService } from 'src/event-bus/event-bus.service';


@Injectable()
export class UsersService {
	constructor(private readonly eventBus: EventBusService) {}

	getAllUser() {
		const users = [
      {
        id: 1,
        name: 'Alice',
      },
      {
        id: 2,
        name: 'George',
      }
    ]

    this.eventBus.emit('user.getAll', users);
    return users;
	}

}
