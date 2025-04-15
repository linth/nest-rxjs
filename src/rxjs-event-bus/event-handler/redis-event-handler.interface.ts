import { Observable } from "rxjs";
import { EventPayloads } from "src/event-bus/event-payload.interface";

export interface RedisEventHandler<K extends keyof EventPayloads = any> {
  event: K;
  handle(data$: Observable<EventPayloads[K]>): void;
}