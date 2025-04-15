import { EventNames } from "src/event-bus/event-names.enum";
import { RedisEventHandler } from "./redis-event-handler.interface";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CacheExpiredHandler implements RedisEventHandler<EventNames.CACHE_EXPIRED> {
	readonly event = EventNames.CACHE_EXPIRED as const;

	handle(data$: Observable<{ key: string }>): void {
		data$.subscribe(({key}) => {
			console.log(`🗑️  Cache expired: ${key}`);
		});
    // do something...
	}
}