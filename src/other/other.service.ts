import { Injectable, OnModuleInit } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class OtherService implements OnModuleInit {
	constructor(
		private readonly sharedService: SharedService,
	) {}

	onModuleInit() {
		this.sharedService.getObservable()
      .subscribe(value => {
        console.log('OtherService 收到：', value);
      });
	}
}
