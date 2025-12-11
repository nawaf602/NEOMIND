// D:\neomindco\services\core-engine\src\modules\nsdt\NSDTController.ts

import { Controller, Get, Param } from '@nestjs/common';
import { NSDTService } from './application/NSDTService';

@Controller('nsdt')
export class NSDTController {
  constructor(private readonly nsdtService: NSDTService) {}

  @Get('status')
  getStatus() {
    return {
      status: 'ok',
      module: 'NSDT',
      description:
        'National State Digital Twin (NSDT) module is online (skeleton).',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * الحالة الوطنية المجمّعة (national snapshot)
   * هنا نستدعي الدالة الموجودة فعليًا في NSDTService: getNationalState
   */
  @Get('state')
  getNationalState() {
    return this.nsdtService.getNationalState();
  }

  /**
   * التايملاين لزون معيّن
   * مثال: GET /nsdt/zones/ZONE-RIYADH-001/timeline
   */
  @Get('zones/:zoneId/timeline')
  getZoneTimeline(@Param('zoneId') zoneId: string) {
    return this.nsdtService.getZoneStateTimeline(zoneId);
  }
}
