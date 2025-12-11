import { Injectable } from '@nestjs/common';
import { DecisionView, RiskIndicator, RecommendedAction } from '../entities/DecisionView.entity';
import { NationalPicture } from './UnifiedNationalPictureBuilder.service';

@Injectable()
export class PredictiveDecisionViewBuilder {
  buildFromNationalPicture(picture: NationalPicture): DecisionView {
    const indicators: RiskIndicator[] = [
      {
        name: 'CompositeRisk',
        value: picture.compositeRiskScore,
      },
      {
        name: 'PSICRisk',
        value: picture.components.psicRiskScore,
      },
      {
        name: 'NSDTRisk',
        value: picture.components.nsdtStateScore,
      },
      {
        name: 'ContextRisk',
        value: picture.components.contextScore,
      },
    ];

    const recommendedActions: RecommendedAction[] = this.buildRecommendedActions(
      picture.compositeRiskScore,
    );

    const contextSummary = `Zone ${picture.zoneId} composite risk is ${
      picture.compositeRiskScore.toFixed(2)
    } (PSIC=${picture.components.psicRiskScore.toFixed(2)}, NSDT=${picture.components.nsdtStateScore.toFixed(
      2,
    )}, CONTEXT=${picture.components.contextScore.toFixed(2)})`;

    return new DecisionView(
      `decision-view-${Date.now()}`,
      picture.zoneId,
      new Date(),
      picture.compositeRiskScore,
      indicators,
      contextSummary,
      recommendedActions,
    );
  }

  private buildRecommendedActions(score: number): RecommendedAction[] {
    if (score >= 0.8) {
      return [
        {
          id: 'INC_PATROLS',
          label: 'Increase patrol presence and activate crisis cell.',
          priority: 'CRITICAL',
        },
        {
          id: 'RESTRICT_ACCESS',
          label: 'Restrict access to critical infrastructure in the zone.',
          priority: 'HIGH',
        },
      ];
    }

    if (score >= 0.5) {
      return [
        {
          id: 'ENHANCED_MONITORING',
          label: 'Activate enhanced monitoring and field reports.',
          priority: 'HIGH',
        },
        {
          id: 'PRE_EVENT_BRIEF',
          label: 'Send brief to decision-makers and field units.',
          priority: 'MEDIUM',
        },
      ];
    }

    return [
      {
        id: 'NORMAL_MONITORING',
        label: 'Keep normal monitoring and periodic reporting.',
        priority: 'LOW',
      },
    ];
  }
}
