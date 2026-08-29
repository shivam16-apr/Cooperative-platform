from fastapi import FastAPI
from pydantic import BaseModel

from .matching import match_workers


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