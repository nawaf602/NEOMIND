import { Injectable } from '@nestjs/common';
import { IdentityBehaviorService } from '../IdentityBehaviorService';
import { GetIdentityRiskProfileDto } from '../dto/GetIdentityRiskProfile.dto';

@Injectable()
export class AnalyzeIdentityProfileUseCase {
  constructor(private readonly service: IdentityBehaviorService) {}

  async execute(dto: GetIdentityRiskProfileDto) {
    return this.service.getIdentityRiskProfile(dto);
  }
}
