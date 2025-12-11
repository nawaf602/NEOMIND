// src/modules/decision-c4s/domain/services/CommandRoutingEngine.service.ts

import { Injectable } from '@nestjs/common';
import {
  Command,
  CommandPriority,
  CommandStatus,
} from '../entities/Command.entity';

export type ZoneRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface DecisionZoneView {
  zoneId: string;
  riskLevel: ZoneRiskLevel;
  riskScore: number;
  summary: string;
  recommendedCommands: Command[];
}

const DEFAULT_ZONES = ['ZONE-RIYADH-001', 'ZONE-RIYADH-002', 'ZONE-MAKKAH-001'];

@Injectable()
export class CommandRoutingEngine {
  /**
   * يبني "منظر القرار" لكل منطقة – هنا مجرد منطق تجريبي (Dummy)
   */
  buildDecisionView(zones?: string[]): DecisionZoneView[] {
    const effectiveZones = zones && zones.length > 0 ? zones : DEFAULT_ZONES;

    const now = new Date();

    return effectiveZones.map((zoneId, index) => {
      const riskScore = this.estimateRiskScore(zoneId, index);
      const riskLevel = this.toRiskLevel(riskScore);

      const commands = this.buildRecommendedCommandsForZone(
        zoneId,
        riskLevel,
        now,
      );

      return {
        zoneId,
        riskLevel,
        riskScore,
        summary: this.makeSummary(zoneId, riskLevel, riskScore, commands),
        recommendedCommands: commands,
      };
    });
  }

  private estimateRiskScore(zoneId: string, index: number): number {
    // منطق بسيط: بس عشان نطلع أرقام واقعية تقريباً بين 0 و 1
    const base =
      zoneId.includes('RIYADH') ? 0.7 : zoneId.includes('MAKKAH') ? 0.55 : 0.4;
    const jitter = (index * 0.07) % 0.2;
    const score = base + jitter;
    return Math.min(0.98, Math.max(0.1, score));
  }

  private toRiskLevel(score: number): ZoneRiskLevel {
    if (score >= 0.8) return 'CRITICAL';
    if (score >= 0.6) return 'HIGH';
    if (score >= 0.4) return 'MEDIUM';
    return 'LOW';
  }

  private buildRecommendedCommandsForZone(
    zoneId: string,
    risk: ZoneRiskLevel,
    now: Date,
  ): Command[] {
    const commands: Command[] = [];

    const addCommand = (
      priority: CommandPriority,
      title: string,
      description: string,
      targetType: Command['target']['type'],
      targetIdSuffix: string,
    ) => {
      const id = `CMD-${zoneId}-${priority}-${targetIdSuffix}`.replace(
        /\s+/g,
        '',
      );

      const command: Command = {
        id,
        zoneId,
        title,
        description,
        priority,
        status: this.initialStatusForRisk(priority, risk),
        target: {
          type: targetType,
          id: `${zoneId}-${targetIdSuffix}`,
          label: `${targetType} – ${targetIdSuffix}`,
        },
        createdAt: now,
        updatedAt: now,
      };

      commands.push(command);
    };

    if (risk === 'CRITICAL' || risk === 'HIGH') {
      addCommand(
        'CRITICAL',
        'Immediate rapid-response deployment',
        'Deploy nearest high-readiness units and enable live monitoring for this zone.',
        'FIELD_TEAM',
        'RAPID-RESPONSE-1',
      );

      addCommand(
        'HIGH',
        'Activate perimeter surveillance',
        'Increase camera sampling rate and enable automatic anomaly flagging.',
        'CAMERA',
        'SURVEILLANCE-RING',
      );
    }

    if (risk === 'MEDIUM' || risk === 'HIGH' || risk === 'CRITICAL') {
      addCommand(
        'MEDIUM',
        'Schedule targeted patrol',
        'Plan an additional patrol circuit in the next 60 minutes focusing on hot streets.',
        'PATROL_UNIT',
        'PATROL-DELTA',
      );
    }

    if (commands.length === 0) {
      addCommand(
        'LOW',
        'Routine presence check',
        'Maintain standard patrol schedule; no additional action required.',
        'PATROL_UNIT',
        'ROUTINE',
      );
    }

    return commands;
  }

  private initialStatusForRisk(
    priority: CommandPriority,
    risk: ZoneRiskLevel,
  ): CommandStatus {
    if (risk === 'CRITICAL' || priority === 'CRITICAL') return 'IN_PROGRESS';
    if (priority === 'HIGH') return 'PENDING';
    return 'PENDING';
  }

  private makeSummary(
    zoneId: string,
    risk: ZoneRiskLevel,
    score: number,
    commands: Command[],
  ): string {
    const levelLabel =
      risk === 'CRITICAL'
        ? 'حالة حرجة – تحتاج تدخل فوري'
        : risk === 'HIGH'
        ? 'مستوى مخاطر مرتفع'
        : risk === 'MEDIUM'
        ? 'مستوى مخاطر متوسط'
        : 'مستوى مخاطر منخفض';

    return `المنطقة ${zoneId}: ${levelLabel} (درجة ${score.toFixed(
      2,
    )}) – أوامر مقترحة: ${commands.length}.`;
  }
}
