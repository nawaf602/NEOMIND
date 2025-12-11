import { Injectable } from '@nestjs/common';
import { IdentityBehaviorService } from '../IdentityBehaviorService';
import { GetSocialRiskMapDto } from '../dto/GetSocialRiskMap.dto';

@Injectable()
export class ComputeSocialRiskForZoneUseCase {
  constructor(private readonly service: IdentityBehaviorService) {}

  async execute(dto: GetSocialRiskMapDto) {
    return this.service.getSocialRiskMap(dto);
  }
}
