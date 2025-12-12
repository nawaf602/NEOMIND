import { SimulatedEvent, SeverityLevel } from "../publishers/EventStreamPublisher";

const ZONES = ["ZONE-RIYADH-001", "ZONE-RIYADH-002", "ZONE-MAKKAH-001"];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSeverity(): SeverityLevel {
  const r = Math.random();
  if (r > 0.92) return "CRITICAL";
  if (r > 0.75) return "HIGH";
  if (r > 0.4) return "MEDIUM";
  return "LOW";
}

/**
 * يولّد مجموعة من الأحداث المرورية لكل "نبضة" من المحاكي
 */
export function generateTrafficEvents(now: Date = new Date()): SimulatedEvent[] {
  const events: SimulatedEvent[] = [];
  const count = 1 + Math.floor(Math.random() * 3); // من 1 إلى 3 أحداث في النبضة

  for (let i = 0; i < count; i++) {
    const zoneId = randomChoice(ZONES);
    const severity = randomSeverity();

    const event: SimulatedEvent = {
      id: `TRAFFIC-${Date.now()}-${i}-${Math.floor(Math.random() * 9999)}`,
      zoneId,
      category: "TRAFFIC",
      subCategory: randomChoice(["CONGESTION", "ACCIDENT_MINOR", "ACCIDENT_MAJOR"]),
      severity,
      source: "SIMULATOR",
      occurredAt: now.toISOString(),
      location: fakeLocationForZone(zoneId),
      metadata: {
        lanesBlocked: Math.floor(Math.random() * 4),
        estDelayMinutes: 5 + Math.floor(Math.random() * 30),
      },
    };

    events.push(event);
  }

  return events;
}

function fakeLocationForZone(zoneId: string): { lat: number; lng: number } {
  switch (zoneId) {
    case "ZONE-RIYADH-001":
      return { lat: 24.7136 + Math.random() * 0.05, lng: 46.6753 + Math.random() * 0.05 };
    case "ZONE-RIYADH-002":
      return { lat: 24.8 + Math.random() * 0.05, lng: 46.7 + Math.random() * 0.05 };
    case "ZONE-MAKKAH-001":
      return { lat: 21.3891 + Math.random() * 0.05, lng: 39.8579 + Math.random() * 0.05 };
    default:
      return { lat: 24.7136, lng: 46.6753 };
  }
}
