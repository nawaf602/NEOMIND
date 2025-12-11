import { Injectable, Logger } from '@nestjs/common';
import { RawEvent } from '../entities/RawEvent.entity';
import { NormalizedEvent } from '../entities/NormalizedEvent.entity';

@Injectable()
export class NormalizationEngine {
  private readonly logger = new Logger(NormalizationEngine.name);

  /**
   * تحويل الحدث الخام RawEvent إلى حدث مُطَبَّع NormalizedEvent
   * بدون أي منطق ثقيل حالياً – بس ترتيب البيانات بشكل موحّد.
   */
  normalize(raw: RawEvent): NormalizedEvent {
    const location = {
      lat: raw.latitude,
      lon: raw.longitude,
      zoneId: raw.zoneId,
    };

    const normalized = new NormalizedEvent(
      raw.id,
      raw.timestamp,       // هنا بدال occurredAt نستخدم timestamp الموجود في RawEvent
      raw.eventType,
      location,
      raw.source,
      raw.metadata ?? {},
    );

    this.logger.debug(
      `Normalized event ${raw.id} (${raw.eventType}) @ [${raw.latitude}, ${raw.longitude}]`,
    );

    return normalized;
  }
}
