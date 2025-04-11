import { EventNames } from "./event-names.enum";

/**
 * 這些字串就是 EventPayloads 的 key，TypeScript 最安全的做法是直接用 keyof EventPayloads 來約束 K，而不是用外部的 enum EventNames。
 */

export interface EventPayloads {
	[EventNames.USER_GETALL]: { id: string; name: string }[];
	[EventNames.DEVICE_CONNECTED]: { deviceId: string, time: Date };
}