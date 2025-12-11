import { Injectable } from '@nestjs/common';
import {
  SocialRiskDimension,
  SocialRiskIndicator,
  TrendDirection,
} from '../entities/SocialRiskIndicator.entity';
import { IdentityProfile } from '../entities/IdentityProfile.entity';

export interface SocialRiskMap {
  zoneId: string;
  indicators: SocialRiskIndicator[];
}

@Injectable()
export class SocialRiskEngine {
  buildZoneRiskMap(
    zoneId: string,
    identities: IdentityProfile[],
  ): SocialRiskMap {
    const relevant = identities.filter((i) => i.zoneId === zoneId);
    if (!relevant.length) {
      return {
        zoneId,
        indicators: [],
      };
    }

    const avgRisk =
      relevant.reduce((sum, i) => sum + i.riskScore, 0) / relevant.length;

    const dimensions: SocialRiskDimension[] = [
      'CRIME',
      'EXTREMISM',
      'PUBLIC_ORDER',
      'CYBER',
      'ECONOMIC',
    ];

    const indicators = dimensions.map((dim, idx) => {
      const modifier = 0.1 * idx;
      const value = Math.max(0, Math.min(1, avgRisk + modifier - 0.2));

      const trend: TrendDirection =
        value > avgRisk + 0.1 ? 'UP' : value < avgRisk - 0.1 ? 'DOWN' : 'STABLE';

      return new SocialRiskIndicator(
        `sr-${zoneId}-${dim.toLowerCase()}`,
        zoneId,
        dim,
        value,
        trend,
        new Date(),
      );
    });

    return {
      zoneId,
      indicators,
    };
  }
}
