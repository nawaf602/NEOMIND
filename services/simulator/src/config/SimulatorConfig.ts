import dotenv from "dotenv";

dotenv.config();

export interface SimulatorConfig {
  coreEngineUrl: string;
  enabled: boolean;
  intervalMs: number;
  scenarios: string[];
}

export function loadSimulatorConfig(): SimulatorConfig {
  const coreEngineUrl =
    process.env.CORE_ENGINE_URL?.trim() || "http://localhost:5100";

  const enabledEnv = process.env.SIMULATOR_ENABLED?.toLowerCase() ?? "true";
  const enabled = enabledEnv === "true" || enabledEnv === "1";

  const intervalMs =
    Number(process.env.SIMULATOR_INTERVAL_MS ?? "5000") || 5000;

  const scenariosEnv =
    process.env.SIMULATOR_SCENARIOS ??
    "traffic,crowd,season"; // نقدر نطفئ بعضها لاحقًا من الـ env
  const scenarios = scenariosEnv
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return {
    coreEngineUrl,
    enabled,
    intervalMs,
    scenarios,
  };
}
