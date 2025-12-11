# NEOMIND ML Engine (Skeleton)

This service represents the **ML Engine** for the NEOMIND platform.

For the MVP / hackathon version, it exposes a small FastAPI HTTP service that will later be called
by the Core Engine (PSIC module) to obtain **anomaly scores** and **risk-related model outputs**.

## Structure

- `src/api/main.py`  
  FastAPI application (health check + PSIC-related ML endpoints).

- `src/models/one_class_svm.py`  
- `src/models/isolation_forest.py`  
- `src/models/lstm_forecast.py`  
- `src/models/autoencoder_anomaly.py`  
- `src/models/gnn_risk_propagation.py`  

For now, these model modules will be **lightweight stubs** that return dummy scores, to keep
the MVP simple, fast, and self-contained without heavy ML dependencies.

## Running locally

```bash
cd ml-engine

# (Optional but recommended) create a virtual environment
# python -m venv .venv
# .venv\Scripts\activate  # on Windows

pip install -r requirements.txt

# Run the FastAPI app (defined in src/api/main.py)
python -m uvicorn src.api.main:app --reload --port 5200
