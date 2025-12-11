import { Injectable } from '@nestjs/common';
import { PSICService } from '../PSICService';

@Injectable()
export class GetPSICSummaryUseCase {
  constructor(private readonly psicService: PSICService) {}

  async execute() {
    // ممكن لاحقاً نستدعي خدمات الدومين ونجمع ملخص
    const status = this.psicService.getStatus();

    return {
      ...status,
      summaryType: 'PSIC_CORE_SUMMARY_SKELETON',
    };
  }
}
