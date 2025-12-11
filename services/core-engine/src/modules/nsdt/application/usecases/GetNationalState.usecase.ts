import { Injectable } from '@nestjs/common';
import { NSDTService } from '../NSDTService';

@Injectable()
export class GetNationalStateUseCase {
  constructor(private readonly nsdtService: NSDTService) {}

  async execute() {
    // حالياً لا نمرّر أي باراميترات – نعيد السكلتون من الخدمة
    return this.nsdtService.getNationalState();
  }
}
