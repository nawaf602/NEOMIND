import { Controller, Get } from '@nestjs/common';

@Controller('context-simulation')
export class ContextSimulationController {
  @Get('status')
  getStatus() {
    return {
      status: 'ok',
      module: 'CONTEXT_SIMULATION',
      description: 'Context Simulation module is online (skeleton).',
      timestamp: new Date().toISOString(),
    };
  }
}
