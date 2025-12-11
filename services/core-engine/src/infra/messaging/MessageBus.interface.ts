export interface Message<TPayload = unknown> {
  topic: string;
  key?: string;
  payload: TPayload;
}

/**
 * واجهة عامة لحافلة الرسائل (Message Bus)
 * ممكن تُنفّذ بـ In-Memory، Kafka، NATS... إلخ
 */
export interface MessageBus {
  publish(message: Message): Promise<void>;
  publishMany(messages: Message[]): Promise<void>;
  subscribe(
    topic: string,
    handler: (message: Message) => Promise<void> | void,
  ): Promise<void> | void;
}
