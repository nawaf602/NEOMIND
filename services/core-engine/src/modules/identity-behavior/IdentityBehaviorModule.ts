// src/modules/identity-behavior/IdentityBehaviorModule.ts

import { Module } from '@nestjs/common';
import { IdentityBehaviorController } from './IdentityBehaviorController';
import { IdentityBehaviorService } from './application/IdentityBehaviorService';
import { IdentityBehaviorEngine } from './domain/services/IdentityBehaviorEngine.service';

@Module({
  controllers: [IdentityBehaviorController],
  providers: [IdentityBehaviorService, IdentityBehaviorEngine],
  exports: [IdentityBehaviorService],
})
export class IdentityBehaviorModule {}
