// src/modules/decision-c4s/domain/services/CommandFeedbackEngine.service.ts

import { Injectable } from '@nestjs/common';

export type CommandFeedbackType =
  | 'ACK'
  | 'REJECTED'
  | 'EXECUTED'
  | 'DELAYED';

export interface CommandFeedback {
  commandId: string;
  feedbackType: CommandFeedbackType;
  notes?: string;
  actor: string;
  timestamp: Date;
}

@Injectable()
export class CommandFeedbackEngine {
  private readonly feedbackLog: CommandFeedback[] = [];

  submitFeedback(payload: CommandFeedback): CommandFeedback {
    const entry: CommandFeedback = {
      ...payload,
      timestamp: payload.timestamp ?? new Date(),
    };

    this.feedbackLog.push(entry);
    return entry;
  }

  getRecentFeedback(limit = 20): CommandFeedback[] {
    return this.feedbackLog.slice(-limit).reverse();
  }
}
