import { Injectable } from '@nestjs/common';
import {
  SpatialContextEngine,
  SpatialContextInput,
} from '../domain/services/SpatialContextEngine.service';
import {
  TemporalContextEngine,
  TemporalContextInput,
} from '../domain/services/TemporalContextEngine.service';
import {
  BehavioralContextEngine,
  BehavioralContextInput,
} from '../domain/services/BehavioralContextEngine.service';
import {
  SecurityContextEngine,
  SecurityContextInput,
} from '../domain/services/SecurityContextEngine.service';

export interface FullContextInput {
  spatial: SpatialContextInput;
  temporal: TemporalContextInput;
  behavioral: BehavioralContextInput;
  security: SecurityContextInput;
}

@Injectable()
export class ContextScoringService {
  constructor(
    private readonly spatialContext: SpatialContextEngine,
    private readonly temporalContext: TemporalContextEngine,
    private readonly behavioralContext: BehavioralContextEngine,
    private readonly securityContext: SecurityContextEngine,
  ) {}

  evaluateContext(input: FullContextInput): {
    spatialScore: number;
    temporalScore: number;
    behavioralScore: number;
    securityScore: number;
    overallScore: number;
  } {
    const spatialScore = this.spatialContext.evaluate(input.spatial);
    const temporalScore = this.temporalContext.evaluate(input.temporal);
    const behavioralScore = this.behavioralContext.evaluate(input.behavioral);
    const securityScore = this.securityContext.evaluate(input.security);

    const overallScore =
      spatialScore * 0.25 +
      temporalScore * 0.2 +
      behavioralScore * 0.25 +
      securityScore * 0.3;

    return {
      spatialScore,
      temporalScore,
      behavioralScore,
      securityScore,
      overallScore,
    };
  }
}
