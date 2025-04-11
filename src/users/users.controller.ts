import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventBusService } from 'src/event-bus/event-bus.service';

type user = [
  {id: number, name: string},
]

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


@Controller('users')
export class UsersController {
  constructor(private readonly eventBus: EventBusService) {}

  @Get()
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
