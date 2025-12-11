// src/modules/identity-behavior/IdentityBehaviorController.ts

import { Controller, Get } from '@nestjs/common';
import { IdentityBehaviorService } from './application/IdentityBehaviorService';

@Controller('identity-behavior')
export class IdentityBehaviorController {
  constructor(
    private readonly identityBehaviorService: IdentityBehaviorService,
  ) {}

  @Get('status')
  getStatus() {
    return this.identityBehaviorService.getStatus();
  }

  /**
   * GET /identity-behavior/insights
   * لقطة مختصرة عن أعلى الهويات خطورة وإحصائيات مجمّعة
   */
  @Get('insights')
  getInsights() {
    return this.identityBehaviorService.getNationalIdentityBehaviorSnapshot();
  }
}
