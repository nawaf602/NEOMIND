import { Injectable } from '@nestjs/common';

@Injectable()
export class StateProjectionService {
  buildZoneTimeline(
    zoneId: string,
    from: Date,
    to: Date,
  ): {
    zoneId: string;
    points: Array<{ timestamp: string; riskScore: number }>;
  } {
    const points: Array<{ timestamp: string; riskScore: number }> = [];

    const steps = 5;
    const startMs = from.getTime();
    const endMs = to.getTime();
    const stepMs = (endMs - startMs) / steps;

    for (let i = 0; i <= steps; i++) {
      const ts = new Date(startMs + stepMs * i);
      // قيمة وهمية للمخاطر بين 0 و 1
      const riskScore = Math.random();
      points.push({
        timestamp: ts.toISOString(),
        riskScore,
      });
    }

    return { zoneId, points };
  }
}
