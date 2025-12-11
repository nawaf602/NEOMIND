from __future__ import annotations

import os
from datetime import datetime
from typing import Any, Dict, Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.models.one_class_svm import OneClassSvmModel

# ------------------------------------------------------------------
# Load environment variables
# ------------------------------------------------------------------
load_dotenv()

ML_ENGINE_PORT = int(os.getenv("ML_ENGINE_PORT", "5200"))
ML_ENGINE_LOG_LEVEL = os.getenv("ML_ENGINE_LOG_LEVEL", "info")
ALLOWED_ORIGINS = os.getenv(
    "ML_ENGINE_ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5100",
).split(",")

# ------------------------------------------------------------------
# FastAPI app
# ------------------------------------------------------------------
app = FastAPI(
    title="NEOMIND ML Engine",
    description="Skeleton ML microservice for NEOMIND (anomaly scoring & risk models).",
    version="0.1.0",
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in ALLOWED_ORIGINS if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------------
# Pydantic models
# ------------------------------------------------------------------
class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "neomind-ml-engine"
    description: str = (
        "ML Engine skeleton for anomaly scoring and risk-related models."
    )
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class AnomalyRequest(BaseModel):
    """Simplified event payload received from PSIC or simulator."""

    eventId: str = Field(..., description="Unique event identifier")
    zoneId: str = Field(..., description="Zone / cell identifier")
    eventType: str = Field(..., description="Type of event (e.g. SUSPICIOUS_ACTIVITY)")
    latitude: float
    longitude: float
    source: str = Field(..., description="Source system (CAMERA, SENSOR, REPORT, ...)")
    metadata: Optional[Dict[str, Any]] = Field(
        default=None, description="Optional extra fields"
    )


class AnomalyResponse(BaseModel):
    status: str
    model: str
    anomalyScore: float
    riskLevel: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# ------------------------------------------------------------------
# Dummy model instance
# ------------------------------------------------------------------
one_class_model = OneClassSvmModel()


def _score_to_risk_level(score: float) -> str:
    if score >= 0.75:
        return "HIGH"
    if score >= 0.4:
        return "MEDIUM"
    return "LOW"


# ------------------------------------------------------------------
# Routes
# ------------------------------------------------------------------
@app.get("/health", response_model=HealthResponse, tags=["health"])
def health_check() -> HealthResponse:
    """
    Basic health check for the ML Engine.
    Used by NEOMIND Core Engine / infra to verify availability.
    """
    return HealthResponse()


@app.post(
    "/psic/anomaly-score",
    response_model=AnomalyResponse,
    tags=["psic-ml"],
)
def compute_anomaly_score(payload: AnomalyRequest) -> AnomalyResponse:
    """
    Skeleton endpoint: receives a normalized event from PSIC
    and returns an anomaly score using a dummy One-Class SVM stub.
    """
    # For now we just pass the full payload as features to the stub model.
    features = payload.model_dump()
    score = one_class_model.score(features)

    return AnomalyResponse(
        status="ok",
        model="one_class_svm_stub",
        anomalyScore=score,
        riskLevel=_score_to_risk_level(score),
    )
