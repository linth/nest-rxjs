import { Observable } from "rxjs";
import { EventPayloads } from "src/event-bus/event-payload.interface";

export interface RedisEventHandler<K extends keyof EventPayloads = any, P = any> {
  event: K;
  handle(data$: Observable<P>): void;
}