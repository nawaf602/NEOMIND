import { Injectable } from '@nestjs/common';

export interface BehavioralContextInput {
  abnormalEventsCount: number;
  socialTensionIndex: number; // 0 - 1
}

@Injectable()
export class BehavioralContextEngine {
  evaluate(input: BehavioralContextInput): number {
    const abnormalScore = Math.min(input.abnormalEventsCount / 10, 1);
    const tensionScore = input.socialTensionIndex;
    return (abnormalScore * 0.5) + (tensionScore * 0.5);
  }
}
