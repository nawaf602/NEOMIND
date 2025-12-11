import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'neomind-core-engine',
      timestamp: new Date().toISOString(),
    };
  }
}
