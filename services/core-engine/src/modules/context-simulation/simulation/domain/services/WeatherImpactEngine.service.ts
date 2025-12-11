import { Injectable } from '@nestjs/common';

export interface WeatherImpactInput {
  zoneId: string;
  temperatureC: number;
  windSpeedKph: number;
  visibilityMeters: number;
}

@Injectable()
export class WeatherImpactEngine {
  simulate(input: WeatherImpactInput): {
    zoneId: string;
    impactScore: number;
  } {
    let score = 0;

    if (input.temperatureC > 45 || input.temperatureC < 0) {
      score += 0.4;
    }
    if (input.windSpeedKph > 60) {
      score += 0.3;
    }
    if (input.visibilityMeters < 500) {
      score += 0.3;
    }

    return {
      zoneId: input.zoneId,
      impactScore: Math.min(score, 1),
    };
  }
}
