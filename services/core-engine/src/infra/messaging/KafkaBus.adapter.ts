import { Message, MessageBus } from './MessageBus.interface';

/**
 * هيكل أوّلي لكائن Kafka Message Bus.
 * حالياً غير مرتبط بأي مكتبة حقيقية (مثل kafkajs),
 * ومجرّد stub جاهز للتنفيذ لاحقاً.
 */
export class KafkaMessageBus implements MessageBus {
  // لاحقاً ممكن نضيف إعدادات الاتصال، الclient، الـ producers/consumers... إلخ
  constructor(/* config: KafkaConfig */) {
    // TODO: initialize Kafka client
  }

  async publish(message: Message): Promise<void> {
    // TODO: send message to Kafka topic
    throw new Error('KafkaMessageBus.publish is not implemented yet.');
  }

  async publishMany(messages: Message[]): Promise<void> {
    // TODO: send batch to Kafka
    throw new Error('KafkaMessageBus.publishMany is not implemented yet.');
  }

  async subscribe(
    _topic: string,
    _handler: (message: Message) => Promise<void> | void,
  ): Promise<void> {
    // TODO: subscribe to Kafka topic and invoke handler
    throw new Error('KafkaMessageBus.subscribe is not implemented yet.');
  }
}
