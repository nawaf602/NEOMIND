import { Injectable } from '@nestjs/common';
import { BehaviorPattern } from '../entities/BehaviorPattern.entity';

export interface BehaviorForecastPoint {
  timestamp: Date;
  expectedRisk: number;
}

@Injectable()
export class BehaviorPredictionEngine {
  /**
   * تنبؤ مبسط لمسار المخاطر لسلوك معيّن.
   * لاحقاً يستبدل بنموذج LSTM من ML Engine.
   */
  forecast(pattern: BehaviorPattern, horizons: number = 3): BehaviorForecastPoint[] {
    const points: BehaviorForecastPoint[] = [];
    const base = pattern.riskScore;

    for (let i = 1; i <= horizons; i++) {
      // مجرد نموذج خطي بسيط كمؤقت
      const drift = (i * 0.05 * (base > 0.5 ? 1 : -1));
      const expected = Math.max(0, Math.min(1, base + drift));

      points.push({
        timestamp: new Date(
          pattern.windowEnd.getTime() + i * 60 * 60 * 1000,
        ),
        expectedRisk: expected,
      });
    }

    return points;
  }
}
