import { PatternSnapshot } from '../entities/PatternSnapshot.entity';
import { RiskProjection } from '../entities/RiskProjection.entity';
import { RiskLevel } from '../../PSICConstants';

export class RiskScoringEngine {
  scoreFromSnapshot(snapshot: PatternSnapshot): RiskProjection {
    const totalEvents = snapshot.features['totalEvents'] ?? 0;
    const riskScore = Math.min(totalEvents / 10, 1); // مقياس مبدئي جداً بين 0 و 1

    let level: RiskLevel = RiskLevel.LOW;
    if (riskScore >= 0.75) level = RiskLevel.CRITICAL;
    else if (riskScore >= 0.5) level = RiskLevel.HIGH;
    else if (riskScore >= 0.25) level = RiskLevel.MEDIUM;

    return new RiskProjection(
      `${snapshot.zoneId}-${snapshot.windowEnd.toISOString()}`,
      snapshot.zoneId,
      snapshot.windowEnd,
      riskScore,
      level,
    );
  }
}
