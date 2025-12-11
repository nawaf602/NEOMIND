import { Injectable } from '@nestjs/common';
import { SimulationService, ScenarioKind } from './SimulationService';

export interface RunScenarioInput {
  kind: ScenarioKind;
  payload: unknown;
}

@Injectable()
export class RunScenarioUseCase {
  constructor(private readonly simulationService: SimulationService) {}

  async execute(input: RunScenarioInput): Promise<unknown> {
    return this.simulationService.runScenario(input.kind, input.payload);
  }
}
