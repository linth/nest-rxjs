import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

/**
 * 在modules內部，建立一個subject提供給外部去訂閱和寫入資料。
 * 	- 提供一個可重複使用的「事件通道」（比如 RxJS Subject 或 Observable）
 * 	- 它是 Observable（或包含 Observable），別人會來訂閱它的事件
 * 
 * ✅「SharedService 是 observable，OtherService 是 observer（訂閱者）」
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
