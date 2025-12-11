// src/modules/decision-c4s/application/DecisionService.ts

import { Injectable } from '@nestjs/common';
import {
  CommandFeedback,
  CommandFeedbackEngine,
  CommandFeedbackType,
} from '../domain/services/CommandFeedbackEngine.service';
import {
  CommandRoutingEngine,
  DecisionZoneView,
} from '../domain/services/CommandRoutingEngine.service';

export interface BuildDecisionViewOptions {
  scenario?: 'LIVE' | 'WHAT_IF';
  zones?: string[];
}

export interface DecisionViewDto {
  status: 'ok';
  module: 'DECISION_C4S';
  scenario: string;
  generatedAt: string;
  zones: DecisionZoneView[];
}

export interface SubmitCommandFeedbackDto {
  commandId: string;
  feedbackType: CommandFeedbackType;
  notes?: string;
  actor?: string;
}

export interface SubmitCommandFeedbackResult {
  status: 'accepted' | 'ignored';
  timestamp: string;
  commandId?: string;
  feedbackType?: CommandFeedbackType;
  reason?: string;
}

@Injectable()
export class DecisionService {
  constructor(
    private readonly routingEngine: CommandRoutingEngine,
    private readonly feedbackEngine: CommandFeedbackEngine,
  ) {}

  getStatus() {
    return {
      status: 'ok',
      module: 'DECISION_C4S',
      description:
        'Decision & Command Orchestration (C4S) module is online (skeleton).',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * يبني منظور قرار على مستوى المناطق – يستخدم محرّك التوجيه
   */
  async buildDecisionView(
    options?: BuildDecisionViewOptions,
  ): Promise<DecisionViewDto> {
    const scenario = options?.scenario ?? 'LIVE';
    const zones = options?.zones && options.zones.length > 0
      ? options.zones
      : undefined;

    const zoneViews = this.routingEngine.buildDecisionView(zones);

    return {
      status: 'ok',
      module: 'DECISION_C4S',
      scenario,
      generatedAt: new Date().toISOString(),
      zones: zoneViews,
    };
  }

  /**
   * يسجّل تغذية راجعة على أمر صادر من غرفة القيادة
   */
  async submitCommandFeedback(
    feedback?: SubmitCommandFeedbackDto,
  ): Promise<SubmitCommandFeedbackResult> {
    if (!feedback) {
      return {
        status: 'ignored',
        reason: 'No feedback payload provided.',
        timestamp: new Date().toISOString(),
      };
    }

    const entry: CommandFeedback = this.feedbackEngine.submitFeedback({
      commandId: feedback.commandId,
      feedbackType: feedback.feedbackType,
      notes: feedback.notes,
      actor: feedback.actor ?? 'UNKNOWN_ACTOR',
      timestamp: new Date(),
    });

    return {
      status: 'accepted',
      commandId: entry.commandId,
      feedbackType: entry.feedbackType,
      timestamp: entry.timestamp.toISOString(),
    };
  }
}
