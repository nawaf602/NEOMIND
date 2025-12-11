export class PatternSnapshot {
  constructor(
    public readonly id: string,
    public readonly zoneId: string,
    public readonly windowStart: Date,
    public readonly windowEnd: Date,
    public readonly features: Record<string, number>,
  ) {}
}
