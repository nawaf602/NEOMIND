// src/modules/decision-c4s/DecisionC4SController.ts

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  DecisionService,
  BuildDecisionViewOptions,
  SubmitCommandFeedbackDto,
} from './application/DecisionService';

@Controller('decision-c4s')
export class DecisionC4SController {
  constructor(private readonly decisionService: DecisionService) {}

  @Get('status')
  getStatus() {
    return this.decisionService.getStatus();
  }

  /**
   * GET /decision-c4s/view?scenario=LIVE&zones=ZONE-RIYADH-001,ZONE-MAKKAH-001
   */
  @Get('view')
  getDecisionView(
    @Query('scenario') scenario?: string,
    @Query('zones') zonesRaw?: string,
  ) {
    const options: BuildDecisionViewOptions = {
      scenario: scenario === 'WHAT_IF' ? 'WHAT_IF' : 'LIVE',
      zones: zonesRaw
        ? zonesRaw
            .split(',')
            .map((z) => z.trim())
            .filter(Boolean)
        : undefined,
    };

    return this.decisionService.buildDecisionView(options);
  }

  /**
   * POST /decision-c4s/feedback
   * {
   *   "commandId": "...",
   *   "feedbackType": "ACK",
   *   "notes": "Received and dispatched",
   *   "actor": "Riyadh-C4S-Operator"
   * }
   */
  @Post('feedback')
  submitFeedback(@Body() body: SubmitCommandFeedbackDto) {
    return this.decisionService.submitCommandFeedback(body);
  }
}
