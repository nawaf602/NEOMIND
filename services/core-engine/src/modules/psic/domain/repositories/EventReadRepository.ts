import { NormalizedEvent } from '../entities/NormalizedEvent.entity';

export interface EventReadRepository {
  findEventsForZone(
    zoneId: string,
    from: Date,
    to: Date,
  ): Promise<NormalizedEvent[]>;
}
