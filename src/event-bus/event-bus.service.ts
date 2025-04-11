import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class EventBusService {
	private subject = new Map<string, Subject<any>>();

	private getOrCreateSubject<T>(eventName: string): Subject<T> {
		if (!this.subject.has(eventName)) {
			this.subject.set(eventName, new Subject<T>());
		}
		return this.subject.get(eventName) as Subject<T>;
	}

	emit<T>(eventName: string, data: T): void {
		const subject = this.getOrCreateSubject<T>(eventName);
		subject.next(data);
	}

	on<T>(eventName: string): Observable<T> {
		return this.getOrCreateSubject<T>(eventName).asObservable();
	}
}
