import { Injectable } from '@nestjs/common';
import { IdentityProfile } from '../entities/IdentityProfile.entity';

export interface FusionCandidate {
  masterId: string;
  mergedIds: string[];
}

@Injectable()
export class IdentityFusionEngine {
  /**
   * منطق مبسط لاقتراح دمج هويات متكررة (نفس الرقم المرجعي/المنطقة).
   * لاحقاً يمكن ربطه بطبقة NIFL المتقدمة.
   */
  suggestFusion(identities: IdentityProfile[]): FusionCandidate[] {
    const byRef = new Map<string, IdentityProfile[]>();

    for (const id of identities) {
      if (!byRef.has(id.nationalRef)) {
        byRef.set(id.nationalRef, []);
      }
      byRef.get(id.nationalRef)!.push(id);
    }

    const suggestions: FusionCandidate[] = [];

    for (const [, list] of byRef.entries()) {
      if (list.length <= 1) continue;

      const sorted = [...list].sort((a, b) => b.riskScore - a.riskScore);
      const master = sorted[0];
      const mergedIds = sorted.slice(1).map((p) => p.id);

      suggestions.push({
        masterId: master.id,
        mergedIds,
      });
    }

    return suggestions;
  }
}
