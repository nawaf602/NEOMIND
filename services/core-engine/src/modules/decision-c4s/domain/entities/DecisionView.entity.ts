export interface RiskIndicator {
  name: string;
  value: number;
}

export interface RecommendedAction {
  id: string;
  label: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export class DecisionView {
  constructor(
    public readonly viewId: string,
    public readonly zoneId: string,
    public readonly generatedAt: Date,
    public readonly overallRiskScore: number,
    public readonly indicators: RiskIndicator[],
    public readonly contextSummary: string,
    public readonly recommendedActions: RecommendedAction[],
  ) {}
}
