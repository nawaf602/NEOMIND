import { Injectable } from '@nestjs/common';

export interface NationalPictureInput {
  zoneId: string;
  psicRiskScore: number;     // من محرك PSIC لاحقاً
  nsdtStateScore: number;    // من NSDT لاحقاً
  contextScore: number;      // من ContextScoring لاحقاً
}

export interface NationalPicture {
  zoneId: string;
  compositeRiskScore: number;
  components: {
    psicRiskScore: number;
    nsdtStateScore: number;
    contextScore: number;
  };
}

@Injectable()
export class UnifiedNationalPictureBuilder {
  build(input: NationalPictureInput): NationalPicture {
    const { psicRiskScore, nsdtStateScore, contextScore } = input;

    const compositeRiskScore =
      psicRiskScore * 0.4 +
      nsdtStateScore * 0.3 +
      contextScore * 0.3;

    return {
      zoneId: input.zoneId,
      compositeRiskScore,
      components: {
        psicRiskScore,
        nsdtStateScore,
        contextScore,
      },
    };
  }
}
