import { SimulatedEvent, SeverityLevel } from "../publishers/EventStreamPublisher";

const ZONES = ["ZONE-RIYADH-001", "ZONE-MAKKAH-001"];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSeverity(): SeverityLevel {
  const r = Math.random();
  if (r > 0.9) return "CRITICAL";
  if (r > 0.7) return "HIGH";
  if (r > 0.4) return "MEDIUM";
  return "LOW";
}

/**
 * سيناريو تجمعات / حشود
 */
export function generateCrowdEvents(now: Date = new Date()): SimulatedEvent[] {
  const events: SimulatedEvent[] = [];
  const count = Math.random() > 0.5 ? 1 : 0; // أحيانًا لا يوجد حشد

  for (let i = 0; i < count; i++) {
    const zoneId = randomChoice(ZONES);
    const severity = randomSeverity();

    const event: SimulatedEvent = {
      id: `CROWD-${Date.now()}-${i}-${Math.floor(Math.random() * 9999)}`,
      zoneId,
      category: "CROWD",
      subCategory: randomChoice(["GATHERING", "SUSPICIOUS_CROWD", "EVENT_OVER_CAPACITY"]),
      severity,
      source: "SIMULATOR",
      occurredAt: now.toISOString(),
      location: fakeLocationForZone(zoneId),
      metadata: {
        estimatedPeople: 50 + Math.floor(Math.random() * 450),
        nearSensitiveSite: Math.random() > 0.6,
      },
    };

    events.push(event);
  }

  return events;
}

function fakeLocationForZone(zoneId: string): { lat: number; lng: number } {
  switch (zoneId) {
    case "ZONE-RIYADH-001":
      return { lat: 24.72 + Math.random() * 0.03, lng: 46.68 + Math.random() * 0.03 };
    case "ZONE-MAKKAH-001":
      return { lat: 21.41 + Math.random() * 0.03, lng: 39.86 + Math.random() * 0.03 };
    default:
      return { lat: 24.7136, lng: 46.6753 };
  }
}
