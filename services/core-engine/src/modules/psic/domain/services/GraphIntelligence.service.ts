import { RiskProjection } from '../entities/RiskProjection.entity';

export class GraphIntelligenceService {
  /**
   * في المستقبل سيتم ربطه بنموذج GNN حقيقي.
   * الآن نعيد نفس الـ projections بدون تعديل.
   */
  propagate(projections: RiskProjection[]): RiskProjection[] {
    return projections;
  }
}
