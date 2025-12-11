import { RiskProjection } from '../entities/RiskProjection.entity';

export class PredictionEngine {
  /**
   * في النسخ المتقدمة سيتم استخدام نماذج ML متعددة.
   * الآن نعتبر أن الـ projections القادمة من RiskScoringEngine نهائية.
   */
  combineSignals(
    projections: RiskProjection[],
  ): RiskProjection[] {
    return projections;
  }
}
