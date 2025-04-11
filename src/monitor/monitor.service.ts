import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBusService } from 'src/event-bus/event-bus.service';


/**
 * 📦 集中管理	所有 Subject 都集中在 EventBusService，便於管理與統一命名
 * ♻️ 可重複使用	多個模組都可以透過同一事件名稱訂閱
 * 🧩 更清晰模組解耦	不用彼此依賴，只透過事件交流資料
 * 🧼 減少 boilerplate	各 service 不需要重複宣告 Subject 成員變數了
 * 
 */
@Injectable()
export class MonitorService implements OnModuleInit {
	constructor(private readonly eventBus: EventBusService) {}

	onModuleInit() {
		this.eventBus.on<{id: number, name: string}>('user.getAll')
      .subscribe(data => {
        console.log(`收到 get all users: ${data}`);        
      });
	}
}
