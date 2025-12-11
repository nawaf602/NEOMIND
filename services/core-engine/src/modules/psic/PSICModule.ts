import { Module } from '@nestjs/common';
import { PSICController } from './PSICController';

// Application layer
import { PSICService } from './application/PSICService';
import { IngestEventUseCase } from './application/usecases/IngestEvent.usecase';
import { GetPSICSummaryUseCase } from './application/usecases/GetPSICSummary.usecase';
import { ComputeRiskForZoneUseCase } from './application/usecases/ComputeRiskForZone.usecase';

// Domain services (engines)
import { NormalizationEngine } from './domain/services/NormalizationEngine.service';
import { PatternEngine } from './domain/services/PatternEngine.service';
import { RiskScoringEngine } from './domain/services/RiskScoringEngine.service';
import { GraphIntelligenceService } from './domain/services/GraphIntelligence.service';
import { PredictionEngine } from './domain/services/PredictionEngine.service';

@Module({
  controllers: [PSICController],
  providers: [
    // Application
    PSICService,
    IngestEventUseCase,
    GetPSICSummaryUseCase,
    ComputeRiskForZoneUseCase,

    // Domain engines
    NormalizationEngine,
    PatternEngine,
    RiskScoringEngine,
    GraphIntelligenceService,
    PredictionEngine,
  ],
  exports: [PSICService],
})
export class PsicModule {}
