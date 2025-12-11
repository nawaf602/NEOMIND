import { Injectable } from '@nestjs/common';

export interface SecurityContextInput {
  recentIncidentsScore: number; // 0 - 1
  threatIntelScore: number;     // 0 - 1
}

@Injectable()
export class SecurityContextEngine {
  evaluate(input: SecurityContextInput): number {
    return input.recentIncidentsScore * 0.6 + input.threatIntelScore * 0.4;
  }
}
