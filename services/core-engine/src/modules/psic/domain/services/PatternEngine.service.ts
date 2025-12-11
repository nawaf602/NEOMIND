import { NormalizedEvent } from '../entities/NormalizedEvent.entity';
import { PatternSnapshot } from '../entities/PatternSnapshot.entity';

export class PatternEngine {
  buildSnapshot(
    zoneId: string,
    windowStart: Date,
    windowEnd: Date,
    events: NormalizedEvent[],
  ): PatternSnapshot {
    const features: Record<string, number> = {
      totalEvents: events.length,
    };

    return new PatternSnapshot(
      `${zoneId}-${windowStart.toISOString()}-${windowEnd.toISOString()}`,
      zoneId,
      windowStart,
      windowEnd,
      features,
    );
  }
}
