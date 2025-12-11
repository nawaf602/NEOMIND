import { Injectable } from '@nestjs/common';
import { IdentityProfile } from '../entities/IdentityProfile.entity';

export interface CulturalTransitionSignal {
  zoneId: string;
  transitionIndex: number; // 0 - 1
  description: string;
}

@Injectable()
export class CulturalTransitionEngine {
  /**
   * يحسب مؤشر تحوّل ثقافي مبسط بناءً على تكتل السمات في منطقة معيّنة.
   */
  computeTransitionSignal(identities: IdentityProfile[]): CulturalTransitionSignal[] {
    const byZone = new Map<string, IdentityProfile[]>();

    for (const id of identities) {
      if (!byZone.has(id.zoneId)) {
        byZone.set(id.zoneId, []);
      }
      byZone.get(id.zoneId)!.push(id);
    }

    const results: CulturalTransitionSignal[] = [];

    for (const [zoneId, list] of byZone.entries()) {
      const totalTraits = list.reduce(
        (acc, profile) => acc + Object.keys(profile.traits).length,
        0,
      );
      const avgTraits = totalTraits / Math.max(1, list.length);

      // مؤشر مبسط: كثرة التغيّر في السمات = تحوّل أعلى
      const index = Math.max(0, Math.min(1, avgTraits / 20));

      const description =
        index > 0.7
          ? 'High cultural and behavioral transition signals.'
          : index > 0.4
          ? 'Moderate transition signals.'
          : 'Low / stable transition signals.';

      results.push({
        zoneId,
        transitionIndex: index,
        description,
      });
    }

    return results;
  }
}
