import { Injectable } from '@nestjs/common';

@Injectable()
export class NSDTService {
  /**
   * إرجاع الحالة الوطنية العامة — سكلتون مبدئي.
   */
  async getNationalState() {
    return {
      status: 'ok',
      module: 'NSDT',
      description: 'National State Digital Twin core is online (skeleton).',
      snapshotId: 'dummy-snapshot-001',
      zones: [],
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * إرجاع تايملاين لحالة منطقة معيّنة — سكلتون مبدئي.
   * الآن نستقبل أي باراميترات (DTO) بدون شكل محدد.
   */
  async getZoneStateTimeline(params: any) {
    return {
      status: 'ok',
      module: 'NSDT',
      description: 'Zone state timeline (skeleton).',
      query: params,
      points: [],
      timestamp: new Date().toISOString(),
    };
  }
}
