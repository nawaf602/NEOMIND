import { Injectable } from '@nestjs/common';
import { IdentityProfile } from '../entities/IdentityProfile.entity';
import { BehaviorPattern } from '../entities/BehaviorPattern.entity';
import { BehaviorAnomalyModel } from '../../ml/BehaviorAnomalyModel';

export interface IdentityRiskContext {
  profile: IdentityProfile;
  patterns: BehaviorPattern[];
}

export interface IdentityRiskResult {
  identityId: string;
  zoneId: string;
  riskScore: number;
  topContributingPatterns: BehaviorPattern[];
}

@Injectable()
export class IdentityIntelligenceEngine {
  constructor(private readonly anomalyModel: BehaviorAnomalyModel) {}

  evaluateIdentityRisk(ctx: IdentityRiskContext): IdentityRiskResult {
    if (!ctx.patterns.length) {
      return {
        identityId: ctx.profile.id,
        zoneId: ctx.profile.zoneId,
        riskScore: ctx.profile.riskScore,
        topContributingPatterns: [],
      };
    }

    // نحسب درجة لكل pattern باستخدام نموذج الشذوذ
    const scoredPatterns = ctx.patterns.map((p) => {
      const score = this.anomalyModel.score(p.features);
      p.updateRiskScore(score);
      return p;
    });

    // نأخذ أعلى 3 مؤثرة
    const top = [...scoredPatterns]
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 3);

    const aggregate =
      scoredPatterns.reduce((sum, p) => sum + p.riskScore, 0) /
      scoredPatterns.length;

    const finalRisk = Math.max(ctx.profile.riskScore, aggregate);

    ctx.profile.updateRiskScore(finalRisk);

    return {
      identityId: ctx.profile.id,
      zoneId: ctx.profile.zoneId,
      riskScore: finalRisk,
      topContributingPatterns: top,
    };
  }
}
