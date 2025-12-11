import { Injectable } from '@nestjs/common';
import { NSDTState } from '../entities/NSDTState.entity';
import { ZoneState } from '../entities/ZoneState.entity';

@Injectable()
export class NSDTStateEngine {
  buildNationalState(zones: ZoneState[]): NSDTState {
    const snapshotId = `nsdt-${Date.now()}`;
    const generatedAt = new Date();
    return new NSDTState(snapshotId, generatedAt, zones);
  }
}
