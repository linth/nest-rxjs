import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBusService } from 'src/event-bus/event-bus.service';
import { EventNames } from 'src/event-bus/event-names.enum';
import { RxjsEventBusService } from 'src/rxjs-event-bus/rxjs-event-bus.service';


/**
 * 📦 集中管理	所有 Subject 都集中在 EventBusService，便於管理與統一命名
 * ♻️ 可重複使用	多個模組都可以透過同一事件名稱訂閱
 * 🧩 更清晰模組解耦	不用彼此依賴，只透過事件交流資料
 * 🧼 減少 boilerplate	各 service 不需要重複宣告 Subject 成員變數了
 * 
 */
@Injectable()
export class MonitorService implements OnModuleInit {
	constructor(
		private readonly eventBus: EventBusService,
		private readonly rxjsEventBus: RxjsEventBusService,
	) {}

	onModuleInit() {
		this.eventBus.on(EventNames.USER_GETALL)
      .subscribe(data => {
        console.log(`[eventBus] 收到 get all users: ${data}`);        
      });

		this.rxjsEventBus.on<{ id: string; name: string }[]>(EventNames.USER_GETALL)
			.subscribe(data => console.log('📦 [Monitor] 使用者清單:', data));

		this.rxjsEventBus.on<{key: string}>(EventNames.CACHE_EXPIRED)
			.subscribe(data => console.log('🚨 [Monitor] 快取過期:', data));
	}
}
