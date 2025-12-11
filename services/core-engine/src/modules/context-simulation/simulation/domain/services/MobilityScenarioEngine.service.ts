import { Injectable } from '@nestjs/common';

export interface MobilityScenarioInput {
  zoneId: string;
  vehiclesPerHour: number;
  pedestriansPerHour: number;
}

@Injectable()
export class MobilityScenarioEngine {
  simulate(input: MobilityScenarioInput): {
    zoneId: string;
    congestionIndex: number;
  } {
    const totalFlow = input.vehiclesPerHour + (input.pedestriansPerHour * 0.3);
    const congestionIndex = Math.min(totalFlow / 2000, 1);
    return {
      zoneId: input.zoneId,
      congestionIndex,
    };
  }
}
