## 🔑 在 NestJS 中 `tokens` 是什麼？

在 NestJS 的依賴注入（Dependency Injection, DI）系統中，「**token**」是一種識別符，用來告訴框架要注入什麼樣的 provider。

### 👉 實際上「token」可以是：

- 一個 **類別（class）**
- 一個 **字串（string）**
- 一個 **符號（symbol）**
- 或其他唯一值

NestJS 就是用這個 token 去找到對應的 provider 實體，然後把它注入到你需要的地方。

---

## 🎯 為什麼會需要自己定義 token？（例如：`REDIS_EVENT_HANDLERS`）

當你要注入的是**一個陣列**或**同一類型的多個實作**（像是多個事件 handler 都實作同一個 interface），NestJS 就沒辦法只靠 class 名字幫你判斷要注入什麼。

這時就需要你**手動用 injection token 來標記與對應這些特殊的 provider**。

```tsx
export const REDIS_EVENT_HANDLERS = Symbol('REDIS_EVENT_HANDLERS');
```

這一行的意思是：我宣告一個唯一的識別符號，來當作我這組 handler 陣列的「代號」。

---

## 📦 實際應用：Injection Token 的作用

- 👀 **標記一組 provider**（如 handler 陣列）
- 🎯 **指定要注入什麼**，避免 NestJS 推斷錯誤（尤其是陣列、interface、抽象類別時）
- ✅ **提高可讀性與可維護性**，你不用在不同檔案到處硬打字串，而是統一集中管理

---

## ✅ 這種做法是不是「統一依賴注入的管理方式」？

**是的，這正是一種統一管理依賴注入的策略！**

它的好處包括：

1. **集中化管理依賴項目（可讀性高）**
2. **減少錯誤（避免 typo）**
3. **支援複雜注入場景（像多實作、陣列、plugin 架構）**
4. **支援抽象 interface 的注入**

---

### 🧠 小結一下：

| 概念 | 說明 |
| --- | --- |
| **Token** | 提供 NestJS 用來識別 provider 的「鑰匙」 |
| **為何需要 token** | 當 provider 是非 class（像 interface、陣列）或多重實作時，NestJS 無法推斷，就要靠 token |
| **Symbol vs 字串** | Symbol 是唯一的、不會重複，適合用來當 injection token。字串也行，但 Symbol 更安全 |
| **統一管理的好處** | 高可維護性、減少錯誤、利於擴展與重構 |

---

如果你未來會做 plugin 化、模組自動註冊、多 handler 自動收集的設計，token 管理就變得非常重要。

你可以繼續問更深入的應用方向，我也可以用圖解幫你視覺化整體架構。要不要我幫你整理 token 應用的幾種常見場景？

---

太好了 🙌

我們來整理一下 **Injection Token 在 NestJS 裡的常見應用場景**，這些都是在中大型專案或模組化架構中經常出現的模式。

---

## 🧩 1. 多實作情境（Multiple Providers for One Interface）

### 🔍 問題：

你有多個 provider 都實作同一個 interface，比如不同類型的 `PaymentService`（信用卡、LinePay、ApplePay 等），NestJS 無法知道你要注入哪一個。

### ✅ 解法：

使用 token 為每一個實作命名：

```tsx
export const CREDIT_CARD = Symbol('CREDIT_CARD');
export const LINE_PAY = Symbol('LINE_PAY');

providers: [
  { provide: CREDIT_CARD, useClass: CreditCardService },
  { provide: LINE_PAY, useClass: LinePayService },
]

```

你就可以在需要的地方透過 token 精準注入：

```tsx
constructor(@Inject(LINE_PAY) private readonly payment: PaymentService) {}
```

---

## 🧩 2. 陣列注入（Multi-provider）

### 🔍 問題：

你有一堆「handler」或「plugin」要自動收集成一個陣列注入進來，例如 RedisEventHandlers。

### ✅ 解法：

定義一個 token 來表示這一組 handler：

```tsx
export const REDIS_EVENT_HANDLERS = Symbol('REDIS_EVENT_HANDLERS');

```

然後在 module 裡用 `multi provider` 方式提供：

```tsx
providers: [
  {
    provide: REDIS_EVENT_HANDLERS,
    useClass: UserCreatedHandler,
    multi: true, // 表示這個 token 會有多個對應
  },
  {
    provide: REDIS_EVENT_HANDLERS,
    useClass: UserUpdatedHandler,
    multi: true,
  },
]

```

> NestJS 原生不支援 multi: true，但你可以透過自定 provider 或套件（例如 @golevelup/nestjs-discovery）實作類似行為。
> 

---

## 🧩 3. 動態模組（Dynamic Module）

### 🔍 問題：

模組需要根據外部 config 建立 provider，像是 RedisModule.forRoot(options)

### ✅ 解法：

透過 token 提供 config 或 connection：

```tsx
export const REDIS_OPTIONS = 'REDIS_OPTIONS';

@Module({})
export class RedisModule {
  static forRoot(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        { provide: REDIS_OPTIONS, useValue: options },
        {
          provide: RedisService,
          useFactory: (opts: RedisOptions) => new RedisService(opts),
          inject: [REDIS_OPTIONS],
        },
      ],
      exports: [RedisService],
    };
  }
}
```

---

## 🧩 4. 注入非 class 的值（Value Injection）

### 🔍 問題：

你想注入一個普通物件、數字、函式等等。

### ✅ 解法：

定義一個 token：

```tsx
export const CONFIG = 'CONFIG';

providers: [
  {
    provide: CONFIG,
    useValue: { redisHost: 'localhost', redisPort: 6379 },
  },
]
```

---

## ✅ 小結

| 用法 | 解決的問題 | 說明 |
| --- | --- | --- |
| 多實作 token | 無法自動判斷實作 | `useClass` + token |
| 陣列注入 | 注入多個 handler/plugin | 可組合處理流程 |
| 動態模組 token | 注入外部參數 | 用 `forRoot()` 傳 config |
| value injection | 注入物件/函式/變數 | `useValue` + token |

---

這些應用都會用到 `token`，而且越是模組化、插件化架構，越需要靠 token 來達成彈性與隔離。

想做一個 plugin 系統、事件處理器自動化收集、或支援多租戶架構，都會非常適合這樣的模式！

