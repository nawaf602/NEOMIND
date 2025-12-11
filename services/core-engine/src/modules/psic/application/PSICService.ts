import { Injectable, Logger } from '@nestjs/common';
import { IngestEventDto } from './dto/IngestEvent.dto';
import { EventMapper } from '../infrastructure/mappers/EventMapper';
import { NormalizationEngine } from '../domain/services/NormalizationEngine.service';
import { RawEvent } from '../domain/entities/RawEvent.entity';
import { NormalizedEvent } from '../domain/entities/NormalizedEvent.entity';

@Injectable()
export class PSICService {
  private readonly logger = new Logger(PSICService.name);

  /**
   * مخزن بسيط في الذاكرة للأحداث الخام والمطَبَّعة
   * مؤقت للـ MVP، لاحقاً نستبدله بقاعدة بيانات + كيو.
   */
  private readonly rawBuffer: RawEvent[] = [];
  private readonly normalizedBuffer: NormalizedEvent[] = [];

  constructor(private readonly normalizationEngine: NormalizationEngine) {}

  /**
   * alias عشان أي كود قديم يستخدم ingest() مباشرة
   */
  ingest(dto: IngestEventDto) {
    return this.ingestEvent(dto);
  }

  /**
   * استقبال حدث جديد:
   * 1) تحويل DTO → RawEvent
   * 2) تطبيع الحدث NormalizationEngine
   * 3) تخزينه في الذاكرة
   */
  ingestEvent(dto: IngestEventDto) {
    const raw = EventMapper.fromDto(dto);
    this.rawBuffer.push(raw);

    const normalized = this.normalizationEngine.normalize(raw);
    this.normalizedBuffer.push(normalized);

    this.logger.log(
      `Ingested event ${raw.id} of type ${raw.eventType} @ [${raw.latitude}, ${raw.longitude}]`,
    );

    return {
      status: 'accepted',
      eventId: raw.id,
    };
  }

  /**
   * حالة وحدة الـ PSIC — تُستخدم في /psic/status
   */
  getStatus() {
    return {
      status: 'ok',
      module: 'PSIC',
      description:
        'Pattern & State Intelligence Core is online (skeleton).',
      bufferSize: this.rawBuffer.length,
      normalizedBufferSize: this.normalizedBuffer.length,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * إرجاع كل الأحداث الخام المخزنة في الذاكرة — لأغراض الديبق فقط.
   */
  getBufferedEvents(): RawEvent[] {
    return this.rawBuffer;
  }
}
