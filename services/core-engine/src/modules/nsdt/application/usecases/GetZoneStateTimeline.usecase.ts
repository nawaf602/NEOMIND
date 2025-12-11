import { Injectable } from '@nestjs/common';
import { NSDTService } from '../NSDTService';

@Injectable()
export class GetZoneStateTimelineUseCase {
  constructor(private readonly nsdtService: NSDTService) {}

  async execute(dto: any) {
    // حالياً نمرّر الـ DTO كما هو إلى الخدمة (سكلتون)
    return this.nsdtService.getZoneStateTimeline(dto);
  }
}
