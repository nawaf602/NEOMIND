import { Injectable } from '@nestjs/common';

export interface SpatialContextInput {
  zoneId: string;
  congestionLevel: number; // 0 - 1
  criticalAssetsNearby: number;
}

@Injectable()
export class SpatialContextEngine {
  evaluate(input: SpatialContextInput): number {
    // وزن بسيط: ازدحام + عدد الأصول الحرجة
    const congestionScore = input.congestionLevel;
    const assetsScore = Math.min(input.criticalAssetsNearby / 5, 1);
    return (congestionScore * 0.6) + (assetsScore * 0.4);
  }
}
