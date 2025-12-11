import { Injectable } from '@nestjs/common';
import { IngestEventDto } from '../dto/IngestEvent.dto';
import { PSICService } from '../PSICService';

@Injectable()
export class IngestEventUseCase {
  constructor(private readonly psicService: PSICService) {}

  async execute(dto: IngestEventDto) {
    // نمرر الحدث إلى خدمة الـ PSIC، وهي تتولى:
    // - تحويل الـ DTO إلى RawEvent
    // - التطبيع Normalization
    // - تخزينه في الذاكرة
    return this.psicService.ingestEvent(dto);
  }
}
