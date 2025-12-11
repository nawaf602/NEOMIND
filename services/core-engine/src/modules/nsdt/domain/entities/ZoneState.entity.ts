export class ZoneState {
  constructor(
    public readonly zoneId: string,
    public readonly population: number,
    public readonly riskScore: number,
    public readonly updatedAt: Date,
  ) {}
}
