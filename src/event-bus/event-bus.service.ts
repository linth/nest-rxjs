import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { EventPayloads } from './event-payload.interface';


@Injectable()
export class EventBusService {
	private subject = new Map<string, Subject<any>>();

	private getOrCreateSubject<K extends keyof EventPayloads>(event: K): Subject<EventPayloads[K]> {
		if (!this.subject.has(event)) {
			this.subject.set(event, new Subject<EventPayloads[K]>());
		}
		return this.subject.get(event) as Subject<EventPayloads[K]>;
	}

	emit<K extends keyof EventPayloads>(event: K, data: EventPayloads[K]): void {
		this.getOrCreateSubject(event).next(data);
	}

	on<K extends keyof EventPayloads>(event: K): Observable<EventPayloads[K]> {
		return this.getOrCreateSubject(event).asObservable();
	}
}
