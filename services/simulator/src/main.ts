import { loadSimulatorConfig } from "./config/SimulatorConfig";
import {
  EventStreamPublisher,
  SimulatedEvent,
} from "./publishers/EventStreamPublisher";
import { generateTrafficEvents } from "./scenarios/TrafficScenario.generator";
import { generateCrowdEvents } from "./scenarios/CrowdScenario.generator";
import { generateSeasonEvents } from "./scenarios/SeasonEventScenario.generator";

async function bootstrap() {
  const config = loadSimulatorConfig();

  console.log("NEOMIND Simulator starting with config:", {
    coreEngineUrl: config.coreEngineUrl,
    enabled: config.enabled,
    intervalMs: config.intervalMs,
    scenarios: config.scenarios,
  });

  if (!config.enabled) {
    console.log("[Simulator] Disabled via SIMULATOR_ENABLED env. Exiting.");
    return;
  }

  const publisher = new EventStreamPublisher(config.coreEngineUrl);

  const runTick = async () => {
    const now = new Date();
    let allEvents: SimulatedEvent[] = [];

    if (config.scenarios.includes("traffic")) {
      allEvents = allEvents.concat(generateTrafficEvents(now));
    }
    if (config.scenarios.includes("crowd")) {
      allEvents = allEvents.concat(generateCrowdEvents(now));
    }
    if (config.scenarios.includes("season")) {
      allEvents = allEvents.concat(generateSeasonEvents(now));
    }

    if (!allEvents.length) {
      console.log("[Simulator] No events generated in this tick.");
      return;
    }

    console.log(
      `[Simulator] Generated ${allEvents.length} events at ${now.toISOString()}`
    );
    await publisher.publishEvents(allEvents);
  };

  // أول نبضة فورًا
  await runTick();

  // نبضات دورية
  setInterval(runTick, config.intervalMs);
}

bootstrap().catch((err) => {
  console.error("Simulator failed to start:", err);
  process.exit(1);
});
