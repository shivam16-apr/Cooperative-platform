from fastapi import FastAPI
from pydantic import BaseModel

from .matching import match_workers
from .forecasting import forecast_demand


app = FastAPI()


class MatchingRequest(BaseModel):
    service: str
    latitude: float
    longitude: float
    max_distance: float = 10


@app.get("/")
def home():
    return {
        "message": "AI Matching API is running"
    }

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "worker-matching-ai"
    }

@app.post("/match")
def match(request: MatchingRequest):

    results = match_workers(
        request.latitude,
        request.longitude,
        request.service,
        request.max_distance
    )

    return {
        "workers": results
    }

@app.get("/forecast")
def forecast(service: str = None):
    results = forecast_demand(service)

    return {
        "forecasts": results
    }

