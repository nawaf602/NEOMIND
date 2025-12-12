import axios from "axios";

export type SeverityLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface SimulatedEvent {
  id: string;
  zoneId: string;
  category: string;
  subCategory: string;
  severity: SeverityLevel;
  source: "SIMULATOR";
  occurredAt: string;
  location: {
    lat: number;
    lng: number;
  };
  metadata: Record<string, any>;
}

export class EventStreamPublisher {
  constructor(private readonly coreEngineUrl: string) {}

  /**
   * يرسل دفعة أحداث إلى PSIC عبر /psic/events
   */
  async publishEvents(events: SimulatedEvent[]): Promise<void> {
    if (!events.length) {
      return;
    }

    try {
      const url = `${this.coreEngineUrl}/psic/events`;
      const payload = {
        source: "SIMULATOR",
        batchId: `sim-${Date.now()}`,
        events,
      };

      const res = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });

      console.log(
        `[Simulator] Sent ${events.length} events to PSIC. Status: ${res.status}`
      );
    } catch (error: any) {
      console.error(
        "[Simulator] Failed to publish events to PSIC:",
        error?.message || error
      );
    }
  }
}
