# 架構設計

```
Redis Pub/Sub <─> EventBusService
                     │
            ┌────────┴────────┐
  Subject(EventName1)   Subject(EventName2)
            │                        │
   .subscribe(...)         .subscribe(...)
            │                        │
  	RxJS observers        	RxJS observers
```



把 事件處理 handler 架構 結合 RxJS 的 Observable 機制，打造一個支援：

🧱 模組解耦（不同模組訂閱不同事件）

🔄 事件自動分派（基於 channel 自動呼叫 handler）

🌊 支援 RxJS Observable 流式處理

♻️ 支援 Subject 多播可重複訂閱
