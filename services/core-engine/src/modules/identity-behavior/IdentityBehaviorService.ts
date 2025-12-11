import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityBehaviorService {
  /**
   * Skeleton status endpoint for the Identity & Behavior Intelligence module.
   * This will be used by the IdentityBehaviorController to expose /identity-behavior/status
   * to the frontend and health monitors.
   */
  getStatus() {
    return {
      status: 'ok',
      module: 'IDENTITY_BEHAVIOR',
      description:
        'Identity & Behavior Intelligence module is online (skeleton).',
      timestamp: new Date().toISOString(),
    };
  }
}
