import { ZoneState } from './ZoneState.entity';

export class NSDTState {
  constructor(
    public readonly snapshotId: string,
    public readonly generatedAt: Date,
    public readonly zones: ZoneState[],
  ) {}
}
