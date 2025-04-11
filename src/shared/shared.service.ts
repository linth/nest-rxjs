import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

/**
 * 在modules內部，建立一個subject提供給外部去訂閱和寫入資料。
 */

@Injectable()
export class SharedService {
	private mySubject = new Subject<string>();

	// 可提供外部寫入資料
	emitValue(value: string): void {
		this.mySubject.next(value);
	}

	// 提供 observable 給別人訂閱
	getObservable() {
		return this.mySubject.asObservable();
	}
}
