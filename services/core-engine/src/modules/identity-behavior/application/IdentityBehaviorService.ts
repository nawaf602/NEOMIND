// src/modules/identity-behavior/application/IdentityBehaviorService.ts

import { Injectable } from '@nestjs/common';
import { IdentityBehaviorEngine } from '../domain/services/IdentityBehaviorEngine.service';
import { IdentityProfile } from '../domain/entities/IdentityProfile.entity';

export interface IdentityBehaviorSnapshotDto {
  status: 'ok';
  module: 'IDENTITY_BEHAVIOR';
  description: string;
  generatedAt: string;
  aggregates: {
    totalTrackedIdentities: number;
    highRiskCount: number;
    criticalRiskCount: number;
    distributionByCategory: {
      CITIZEN: { total: number; highOrCritical: number };
      RESIDENT: { total: number; highOrCritical: number };
      VISITOR: { total: number; highOrCritical: number };
      ENTITY: { total: number; highOrCritical: number };
    };
  };
  highRiskIdentities: Array<{
    internalId: string;
    nationalId?: string;
    fullName: string;
    category: string;
    riskLevel: string;
    riskScore: number;
    lastUpdatedAt: string;
    keySignals: string[];
  }>;
}

@Injectable()
export class IdentityBehaviorService {
  constructor(
    private readonly identityBehaviorEngine: IdentityBehaviorEngine,
  ) {}

  getStatus() {
    return {
      status: 'ok',
      module: 'IDENTITY_BEHAVIOR',
      description:
        'Identity & Behavior Intelligence module is online (skeleton).',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * يبني لقطة "وطنية" مبسطة لسلوك الهوية لاستخدامها في لوحات القيادة.
   */
  getNationalIdentityBehaviorSnapshot(): IdentityBehaviorSnapshotDto {
    const aggregates = this.identityBehaviorEngine.getAggregatedStats();
    const highRiskIdentities: IdentityProfile[] =
      this.identityBehaviorEngine.getHighRiskIdentities(10);

    const mapped = highRiskIdentities.map((p) => ({
      internalId: p.internalId,
      nationalId: p.nationalId,
      fullName: p.fullName,
      category: p.category,
      riskLevel: p.riskLevel,
      riskScore: p.riskScore,
      lastUpdatedAt: p.lastUpdatedAt.toISOString(),
      keySignals: p.keySignals.map(
        (s) => `${s.label} (وزن ${s.weight.toFixed(2)})`,
      ),
    }));

    return {
      status: 'ok',
      module: 'IDENTITY_BEHAVIOR',
      description:
        'National-level identity & behavior snapshot (skeleton – demo data).',
      generatedAt: new Date().toISOString(),
      aggregates: {
        totalTrackedIdentities: aggregates.totalTrackedIdentities,
        highRiskCount: aggregates.highRiskCount,
        criticalRiskCount: aggregates.criticalRiskCount,
        distributionByCategory: aggregates.distributionByCategory,
      },
      highRiskIdentities: mapped,
    };
  }
}
