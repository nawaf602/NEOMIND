import { Injectable } from '@nestjs/common';
import {
  MobilityScenarioEngine,
  MobilityScenarioInput,
} from '../domain/services/MobilityScenarioEngine.service';
import {
  CrowdScenarioEngine,
  CrowdScenarioInput,
} from '../domain/services/CrowdScenarioEngine.service';
import {
  WeatherImpactEngine,
  WeatherImpactInput,
} from '../domain/services/WeatherImpactEngine.service';
import {
  EventScenarioEngine,
  EventScenarioInput,
} from '../domain/services/EventScenarioEngine.service';

export type ScenarioKind =
  | 'mobility'
  | 'crowd'
  | 'weather'
  | 'event';

@Injectable()
export class SimulationService {
  constructor(
    private readonly mobilityEngine: MobilityScenarioEngine,
    private readonly crowdEngine: CrowdScenarioEngine,
    private readonly weatherEngine: WeatherImpactEngine,
    private readonly eventEngine: EventScenarioEngine,
  ) {}

  async runScenario(
    kind: ScenarioKind,
    payload: unknown,
  ): Promise<unknown> {
    switch (kind) {
      case 'mobility':
        return this.mobilityEngine.simulate(payload as MobilityScenarioInput);

      case 'crowd':
        return this.crowdEngine.simulate(payload as CrowdScenarioInput);

      case 'weather':
        return this.weatherEngine.simulate(payload as WeatherImpactInput);

      case 'event':
        return this.eventEngine.simulate(payload as EventScenarioInput);

      default:
        throw new Error(`Unsupported scenario kind: ${kind}`);
    }
  }
}
