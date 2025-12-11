import { RiskLevel } from '../../PSICConstants';

export class RiskProjection {
  constructor(
    public readonly id: string,
    public readonly zoneId: string,
    public readonly timestamp: Date,
    public readonly riskScore: number,
    public readonly level: RiskLevel,
  ) {}
}
