import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
	private publisher: RedisClientType;
	private subscriber: RedisClientType;

	async onModuleInit() {
		this.publisher = createClient();
		this.subscriber = createClient();

		this.publisher.on('error', err => console.log('Redis Pub Error:', err));
		this.subscriber.on('error', err => console.error('Redis Sub Error:', err));

		await Promise.all([
			this.publisher.connect(),
			this.subscriber.connect(),
		]);
	}

	async getPublisher(): Promise<RedisClientType> {
		if (!this.publisher) {
			this.publisher = createClient();
			await this.publisher.connect();
		}
		return this.publisher;
	}

	async getSubscriber(): Promise<RedisClientType> {
		if (!this.subscriber) {
			this.subscriber = createClient();
			await this.subscriber.connect();
		}
		return this.subscriber;
	}

	private bindEvents(client: RedisClientType, label: string): void {
		client.on('error', err => {
			console.error(`❗ Redis ${label} 錯誤:`, err);
		});

		client.on('end', () => {
			console.warn(`⚠️ Redis ${label} 已斷線`);
		});
	}

	private async connectWithRetry(client: RedisClientType, label: string) {
		const maxRetries = 5;
		let attempt = 0;

		while (attempt < maxRetries) {
			try {
				await client.connect();
				console.log(`✅ Redis ${label} 成功連線`);
        return;
			} catch (err) {
				attempt++;
				console.warn(`❌ Redis ${label} 第 ${attempt} 次連線失敗:`, err.message);
				await new Promise(res => setTimeout(res, 1000 * attempt)); // 漸進式延遲
			}
		}

		console.error(`🚫 Redis ${label} 連線失敗超過 ${maxRetries} 次，放棄重試`);
		throw new Error(`Redis ${label} 無法連線`);
	}
}
