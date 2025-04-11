import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EventBusModule } from 'src/event-bus/event-bus.module';

@Module({
  imports: [EventBusModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
