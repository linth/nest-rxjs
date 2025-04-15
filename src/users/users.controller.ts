import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get('cache')
  getCacheExpired() {
    return this.usersService.getCacheExpired();
  }
}
