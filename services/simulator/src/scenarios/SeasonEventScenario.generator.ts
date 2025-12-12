import { SimulatedEvent, SeverityLevel } from "../publishers/EventStreamPublisher";

const ZONES = ["ZONE-RIYADH-001", "ZONE-RIYADH-002", "ZONE-MAKKAH-001"];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSeverity(): SeverityLevel {
  const r = Math.random();
  if (r > 0.95) return "CRITICAL";
  if (r > 0.8) return "HIGH";
  if (r > 0.5) return "MEDIUM";
  return "LOW";
}

/**
 * سيناريو فعاليات موسمية (مهرجانات، مواسم، إلخ)
 */
export function generateSeasonEvents(now: Date = new Date()): SimulatedEvent[] {
  const events: SimulatedEvent[] = [];
  const shouldGenerate = Math.random() > 0.4;

  if (!shouldGenerate) {
    return events;
  }

  const count = 1 + Math.floor(Math.random() * 2);

  for (let i = 0; i < count; i++) {
    const zoneId = randomChoice(ZONES);
    const severity = randomSeverity();

    const event: SimulatedEvent = {
      id: `SEASON-${Date.now()}-${i}-${Math.floor(Math.random() * 9999)}`,
      zoneId,
      category: "SEASON_EVENT",
      subCategory: randomChoice(["FESTIVAL", "SPORT_EVENT", "RELIGIOUS_EVENT"]),
      severity,
      source: "SIMULATOR",
      occurredAt: now.toISOString(),
      location: fakeLocationForZone(zoneId),
      metadata: {
        expectedAttendance: 1000 + Math.floor(Math.random() * 9000),
        crowdControlPlan: Math.random() > 0.3,
      },
    };

    events.push(event);
  }

  return events;
}

function fakeLocationForZone(zoneId: string): { lat: number; lng: number } {
  switch (zoneId) {
    case "ZONE-RIYADH-001":
      return { lat: 24.75 + Math.random() * 0.04, lng: 46.7 + Math.random() * 0.04 };
    case "ZONE-RIYADH-002":
      return { lat: 24.8 + Math.random() * 0.04, lng: 46.75 + Math.random() * 0.04 };
    case "ZONE-MAKKAH-001":
      return { lat: 21.42 + Math.random() * 0.04, lng: 39.86 + Math.random() * 0.04 };
    default:
      return { lat: 24.7136, lng: 46.6753 };
  }
}
