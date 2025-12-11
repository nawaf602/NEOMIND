export class RawEvent {
  constructor(
    public readonly id: string,
    public readonly timestamp: Date,
    public readonly eventType: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly zoneId?: string,
    public readonly source?: string,
    public readonly metadata?: Record<string, any>,
  ) {}
}
