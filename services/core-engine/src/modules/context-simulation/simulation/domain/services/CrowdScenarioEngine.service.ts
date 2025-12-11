import { Injectable } from '@nestjs/common';

export interface CrowdScenarioInput {
  zoneId: string;
  expectedCrowdSize: number;
  areaSquareMeters: number;
}

@Injectable()
export class CrowdScenarioEngine {
  simulate(input: CrowdScenarioInput): {
    zoneId: string;
    densityPerSqm: number;
  } {
    const density = input.expectedCrowdSize / Math.max(input.areaSquareMeters, 1);
    return {
      zoneId: input.zoneId,
      densityPerSqm: density,
    };
  }
}
