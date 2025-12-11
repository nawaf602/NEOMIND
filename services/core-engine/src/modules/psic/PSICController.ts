import { Body, Controller, Get, Post } from '@nestjs/common';
import { PSICService } from './application/PSICService';
import { IngestEventUseCase } from './application/usecases/IngestEvent.usecase';
import { IngestEventDto } from './application/dto/IngestEvent.dto';

@Controller('psic')
export class PSICController {
  constructor(
    private readonly psicService: PSICService,
    private readonly ingestEventUseCase: IngestEventUseCase,
  ) {}

  @Get('status')
  getStatus() {
    return this.psicService.getStatus();
  }

  @Post('events')
  async ingestEvent(@Body() dto: IngestEventDto) {
    const eventId = await this.ingestEventUseCase.execute(dto);
    return {
      status: 'accepted',
      eventId,
    };
  }

  // 🔥 NEW: Heatmap endpoint (Mock)
  @Get('heatmap')
  getHeatmap() {
    const now = new Date().toISOString();

    return {
      generatedAt: now,
      cells: [
        {
          zoneId: 'ZONE-RIYADH-001',
          riskScore: 0.82,
          riskLevel: 'HIGH',
          eventCount: 12,
        },
        {
          zoneId: 'ZONE-RIYADH-002',
          riskScore: 0.35,
          riskLevel: 'LOW',
          eventCount: 3,
        },
        {
          zoneId: 'ZONE-MAKKAH-001',
          riskScore: 0.63,
          riskLevel: 'MEDIUM',
          eventCount: 7,
        },
      ],
    };
  }
}
