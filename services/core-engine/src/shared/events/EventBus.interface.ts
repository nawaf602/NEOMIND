import { DomainEvent } from './DomainEvent';

export interface EventBus {
  publish<T extends DomainEvent>(event: T): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
  subscribe(
    eventName: string,
    handler: (event: DomainEvent) => Promise<void> | void,
  ): void;
}
