import { IngestEventDto } from '../../application/dto/IngestEvent.dto';
import { RawEvent } from '../../domain/entities/RawEvent.entity';

export class EventMapper {
  /**
   * تحويل DTO القادم من الـ API إلى RawEvent داخل الدومين.
   */
  static fromDto(dto: IngestEventDto): RawEvent {
    return new RawEvent(
      dto.id,
      new Date(dto.timestamp),
      dto.eventType,
      dto.latitude,
      dto.longitude,
      dto.zoneId,
      dto.source,
      dto.metadata,
    );
  }
}
