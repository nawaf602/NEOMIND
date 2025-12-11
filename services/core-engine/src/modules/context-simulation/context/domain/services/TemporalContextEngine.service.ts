import { Injectable } from '@nestjs/common';

export interface TemporalContextInput {
  timestamp: Date;
  isHoliday: boolean;
  isWeekend: boolean;
}

@Injectable()
export class TemporalContextEngine {
  evaluate(input: TemporalContextInput): number {
    const hour = input.timestamp.getHours();
    const isNight = hour >= 22 || hour < 5;

    let score = 0;
    if (isNight) score += 0.4;
    if (input.isWeekend) score += 0.3;
    if (input.isHoliday) score += 0.3;

    return Math.min(score, 1);
  }
}
