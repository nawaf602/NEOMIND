export type SocialRiskDimension =
  | 'CRIME'
  | 'EXTREMISM'
  | 'PUBLIC_ORDER'
  | 'CYBER'
  | 'ECONOMIC'
  | 'OTHER';

export type TrendDirection = 'UP' | 'DOWN' | 'STABLE';

export class SocialRiskIndicator {
  constructor(
    public readonly id: string,
    public readonly zoneId: string,
    public readonly dimension: SocialRiskDimension,
    public value: number,
    public trend: TrendDirection,
    public readonly calculatedAt: Date,
  ) {}

  update(value: number, trend: TrendDirection) {
    this.value = Math.max(0, Math.min(1, value));
    this.trend = trend;
  }
}
