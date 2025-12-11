import { Injectable } from '@nestjs/common';

export interface EventScenarioInput {
  zoneId: string;
  eventType: string;
  expectedAttendees: number;
  isHighProfile: boolean;
}

@Injectable()
export class EventScenarioEngine {
  simulate(input: EventScenarioInput): {
    zoneId: string;
    baseRisk: number;
  } {
    let baseRisk = 0;

    if (input.expectedAttendees > 50000) {
      baseRisk += 0.4;
    } else if (input.expectedAttendees > 10000) {
      baseRisk += 0.2;
    }

    if (input.isHighProfile) {
      baseRisk += 0.3;
    }

    if (input.eventType.toLowerCase().includes('sports')) {
      baseRisk += 0.1;
    }

    return {
      zoneId: input.zoneId,
      baseRisk: Math.min(baseRisk, 1),
    };
  }
}
