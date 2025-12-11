import { Message, MessageBus } from './MessageBus.interface';

/**
 * حافلة رسائل داخلية بسيطة في الذاكرة فقط.
 * مفيدة للتجارب، والـ unit tests، وتشغيل الـ demo بدون Kafka.
 */
export class InMemoryBus implements MessageBus {
  private readonly handlers: Map<
    string,
    Array<(message: Message) => Promise<void> | void>
  > = new Map();

  async publish(message: Message): Promise<void> {
    const subscribers = this.handlers.get(message.topic) ?? [];

    for (const handler of subscribers) {
      try {
        await handler(message);
      } catch (err) {
        // في بيئة حقيقية ممكن نستخدم Logger
        // هنا نطبع فقط للمراقبة
        // eslint-disable-next-line no-console
        console.error(
          `[InMemoryBus] Error while handling message on topic "${message.topic}":`,
          err,
        );
      }
    }
  }

  async publishMany(messages: Message[]): Promise<void> {
    for (const message of messages) {
      await this.publish(message);
    }
  }

  async subscribe(
    topic: string,
    handler: (message: Message) => Promise<void> | void,
  ): Promise<void> {
    const existing = this.handlers.get(topic) ?? [];
    existing.push(handler);
    this.handlers.set(topic, existing);
  }
}
