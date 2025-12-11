export interface NormalizedLocation {
  lat: number;
  lon: number;
  zoneId?: string;
}

export class NormalizedEvent {
  constructor(
    public readonly id: string,
    public readonly occurredAt: Date,
    public readonly type: string,
    public readonly location: NormalizedLocation,
    public readonly source?: string,
    public readonly payload: Record<string, any> = {},
  ) {}
}
