import { Module } from '@nestjs/common';
import { ContextSimulationController } from './ContextSimulationController';

import { SpatialContextEngine } from './context/domain/services/SpatialContextEngine.service';
import { TemporalContextEngine } from './context/domain/services/TemporalContextEngine.service';
import { BehavioralContextEngine } from './context/domain/services/BehavioralContextEngine.service';
import { SecurityContextEngine } from './context/domain/services/SecurityContextEngine.service';

import { ContextScoringService } from './context/application/ContextScoringService';

@Module({
  controllers: [ContextSimulationController],
  providers: [
    SpatialContextEngine,
    TemporalContextEngine,
    BehavioralContextEngine,
    SecurityContextEngine,
    ContextScoringService,
  ],
  exports: [ContextScoringService],
})
export class ContextSimulationModule {}
