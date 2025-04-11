import { Injectable, OnModuleInit } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';

/**
 * Observer: 負責觀察(訂閱)事件並做出反應 (使用.subscribe())
 * 
 * ✅「SharedService 是 observable，OtherService 是 observer（訂閱者）」
 */
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
