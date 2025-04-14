import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { Observable, Subject } from 'rxjs';


/**
 * 🧩 設計一個 通用的 NestJS 範例，整合 Redis Pub/Sub + RxJS Subject，讓你可以在不同的 module 之間：
 * 	- 發送事件（像 user.created、cache.expired 等等）
 * 	- 監聽事件（可在任何 module 訂閱）
 * 	- 把 Redis 當作分散式事件橋接器
 * 	- 用 RxJS 提供型別安全、靈活的事件處理流程
 * 
 * 
 * Module A → Redis.publish() → Redis EventBus (RxJS) → Module B.subscribe()
 * 
 */
@Injectable()
export class RxjsRedisEventBusService implements OnModuleInit, OnModuleDestroy {
	private redisPublisher: RedisClientType;
	private redisSubscriber: RedisClientType;

	private subjects: Map<string, Subject<any>> = new Map();

	async onModuleInit() {
		/**
		 * 這兩行建立了兩個 Redis client：
		 * 	- redisPublisher：用來發送事件（publish()）
		 * 	- redisSubscriber：用來訂閱事件（pSubscribe()）
		 * 
		 * Redis 的 client 無法同時做 publish 和 subscribe，所以要分開建立兩個實例。
		 */
		this.redisPublisher = createClient();
		this.redisSubscriber = createClient();

		/**
		 * 這是連線 Redis server，createClient() 是 async，因此需要 await。
		 */
		await this.redisPublisher.connect();
		await this.redisSubscriber.connect();

		/**
		 * pSubscribe('*', ...)
		 * 	- 訂閱所有頻道（用 * 是 wildcard pattern）
		 * 	- Redis 每當有訊息發佈在任一頻道，就會觸發這個 callback
		 * 
		 * channel：Redis 中的頻道名稱（對應事件名稱，例如 user.created）
		 * message：Redis 發佈的訊息（通常是 JSON 字串）
		 * 
		 * 流程:
		 * 	- 根據 channel 找出對應的 RxJS Subject（這個是 .on() 時建立的）
		 * 	- 如果有訂閱者，就 subject.next(JSON.parse(message))，通知所有 .subscribe() 的地方。
		 * 
		 * [ Redis 訊息 ] --> [ RxJS Subject.next() ] --> [ 各模組的 .subscribe() ]
		 * 任何經由 Redis.publish() 傳送出來的事件，都會透過這個管道被 RxJS 的 Observable 接收，實現跨模組 / 跨服務的即時反應能力。
		 * 
		 */
		this.redisSubscriber.pSubscribe('*', (message, channel) => {
			const subject = this.subjects.get(channel);
			if (subject) {
				subject.next(JSON.parse(message));
			}
		});
	}

	async onModuleDestroy() {
		await this.redisPublisher.quit();
		await this.redisSubscriber.quit();
	}

	async emit<T = any>(event: string, data: T) {
		await this.redisPublisher.publish(event, JSON.stringify(data));
	}

	on<T = any>(event: string): Observable<T> {
		if (!this.subjects.has(event)) {
			this.subjects.set(event, new Subject<T>());
		}
		return this.subjects.get(event).asObservable();
	}
}
