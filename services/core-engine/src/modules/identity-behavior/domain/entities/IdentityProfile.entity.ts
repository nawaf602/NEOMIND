// src/modules/identity-behavior/domain/entities/IdentityProfile.entity.ts

export type IdentityRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IdentityCategory =
  | 'CITIZEN'
  | 'RESIDENT'
  | 'VISITOR'
  | 'ENTITY';

export interface IdentitySignal {
  code: string;
  label: string;
  weight: number; // 0 - 1
}

export interface IdentityProfile {
  internalId: string;
  nationalId?: string;
  fullName: string;
  category: IdentityCategory;
  riskLevel: IdentityRiskLevel;
  riskScore: number; // 0 - 1
  lastUpdatedAt: Date;
  keySignals: IdentitySignal[];
}
