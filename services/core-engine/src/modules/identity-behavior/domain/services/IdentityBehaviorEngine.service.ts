// src/modules/identity-behavior/domain/services/IdentityBehaviorEngine.service.ts

import { Injectable } from '@nestjs/common';
import {
  IdentityProfile,
  IdentityRiskLevel,
} from '../entities/IdentityProfile.entity';

@Injectable()
export class IdentityBehaviorEngine {
  /**
   * في هذه النسخة، نستخدم بيانات تجريبية (Dummy) فقط
   * لاحقًا يمكن ربطها بقاعدة بيانات أو NSDT.
   */
  getHighRiskIdentities(limit = 10): IdentityProfile[] {
    const now = new Date();

    const samples: IdentityProfile[] = [
      {
        internalId: 'ID-CIT-0001',
        nationalId: '1010101010',
        fullName: 'مواطن عالي الخطورة – عينة',
        category: 'CITIZEN',
        riskLevel: 'CRITICAL',
        riskScore: 0.93,
        lastUpdatedAt: now,
        keySignals: [
          {
            code: 'REPEATED_INCIDENTS',
            label: 'بلاغات متكررة في أكثر من منطقة حساسة',
            weight: 0.5,
          },
          {
            code: 'PATTERN_ANOMALY',
            label: 'أنماط حركة وسلوك غير اعتيادية قرب منشآت حيوية',
            weight: 0.43,
          },
        ],
      },
      {
        internalId: 'ID-RES-0002',
        nationalId: '2020202020',
        fullName: 'مقيم تحت المراقبة السلوكية – عينة',
        category: 'RESIDENT',
        riskLevel: 'HIGH',
        riskScore: 0.78,
        lastUpdatedAt: now,
        keySignals: [
          {
            code: 'SUSPICIOUS_GATHERINGS',
            label: 'تجمعات متكررة في أحياء ذات حساسية أمنية',
            weight: 0.4,
          },
          {
            code: 'LINKED_IDENTITIES',
            label: 'ارتباطات مع هويات عالية الخطورة',
            weight: 0.38,
          },
        ],
      },
    ];

    return samples.slice(0, limit);
  }

  /**
   * إحصائيات مجمّعة عن توزيع المخاطر على مستوى الهوية.
   */
  getAggregatedStats() {
    // أرقام تجريبية – تمثيلية فقط
    return {
      totalTrackedIdentities: 125_000,
      highRiskCount: 320,
      criticalRiskCount: 48,
      lastUpdatedAt: new Date(),
      distributionByCategory: {
        CITIZEN: {
          total: 80_000,
          highOrCritical: 220,
        },
        RESIDENT: {
          total: 35_000,
          highOrCritical: 90,
        },
        VISITOR: {
          total: 8_000,
          highOrCritical: 8,
        },
        ENTITY: {
          total: 2_000,
          highOrCritical: 50,
        },
      },
    };
  }

  /**
   * يحوّل مستوى المخاطر لنص عربي مختصر لواجهة الاستخدام أو التقارير.
   */
  getRiskLabelArabic(level: IdentityRiskLevel): string {
    switch (level) {
      case 'CRITICAL':
        return 'خطورة حرجة';
      case 'HIGH':
        return 'خطورة عالية';
      case 'MEDIUM':
        return 'خطورة متوسطة';
      case 'LOW':
      default:
        return 'خطورة منخفضة';
    }
  }
}
