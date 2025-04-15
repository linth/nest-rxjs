import { Injectable } from "@nestjs/common";
import { RedisEventHandler } from "./redis-event-handler.interface";
import { EventNames } from "src/event-bus/event-names.enum";
import { Observable } from "rxjs";


@Injectable()
export class UserHandler implements RedisEventHandler<EventNames.USER_GETALL> {
  readonly event = EventNames.USER_GETALL as const;

  handle(data$: Observable<{ id: string; name: string }[]>): void {
		// 可以做一些邏輯封裝，交給 service 處理或 return observable
    data$.subscribe(data => {
      console.log('🟢 收到使用者清單 [UserHandler]:', data);
    });
  }
}