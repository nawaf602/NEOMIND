import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PsicModule } from '../modules/psic/PSICModule';
import { NSDTModule } from '../modules/nsdt/NSDTModule';
import { ContextSimulationModule } from '../modules/context-simulation/ContextSimulationModule';
import { DecisionC4SModule } from '../modules/decision-c4s/DecisionC4SModule';
import { IdentityBehaviorModule } from '../modules/identity-behavior/IdentityBehaviorModule';

@Module({
  imports: [
    PsicModule,
    NSDTModule,
    ContextSimulationModule,
    DecisionC4SModule,
    IdentityBehaviorModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
