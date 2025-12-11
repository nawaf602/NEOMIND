// src/modules/decision-c4s/DecisionC4SModule.ts

import { Module } from '@nestjs/common';
import { DecisionC4SController } from './DecisionC4SController';
import { DecisionService } from './application/DecisionService';
import { CommandRoutingEngine } from './domain/services/CommandRoutingEngine.service';
import { CommandFeedbackEngine } from './domain/services/CommandFeedbackEngine.service';

@Module({
  controllers: [DecisionC4SController],
  providers: [DecisionService, CommandRoutingEngine, CommandFeedbackEngine],
  exports: [DecisionService],
})
export class DecisionC4SModule {}
