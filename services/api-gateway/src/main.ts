import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.API_GATEWAY_PORT || 5300;
const CORE_ENGINE_URL = process.env.CORE_ENGINE_URL || "http://localhost:5100";

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "neomind-api-gateway",
    coreEngineUrl: CORE_ENGINE_URL,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`NEOMIND API Gateway is running on http://localhost:${PORT}`);
});
