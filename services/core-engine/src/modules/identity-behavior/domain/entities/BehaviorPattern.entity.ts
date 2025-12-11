export type BehaviorPatternType =
  | 'MOBILITY'
  | 'ONLINE_ACTIVITY'
  | 'FINANCIAL'
  | 'SOCIAL_INTERACTIONS'
  | 'OTHER';

export class BehaviorPattern {
  constructor(
    public readonly id: string,
    public readonly identityId: string,
    public readonly patternType: BehaviorPatternType,
    public readonly features: Record<string, number>,
    public riskScore: number,
    public readonly windowStart: Date,
    public readonly windowEnd: Date,
  ) {}

  updateRiskScore(risk: number) {
    this.riskScore = Math.max(0, Math.min(1, risk));
  }
}
