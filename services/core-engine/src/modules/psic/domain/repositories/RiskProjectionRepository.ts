import { RiskProjection } from '../entities/RiskProjection.entity';

export interface RiskProjectionRepository {
  save(projection: RiskProjection): Promise<void>;
  findLatestForZone(zoneId: string): Promise<RiskProjection | null>;
}
