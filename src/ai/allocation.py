import json
from pathlib import Path

from .forecasting import forecast_demand


BASE_DIR = Path(__file__).resolve().parent
WORKERS_FILE = BASE_DIR / "workers.json"


def load_workers():
    with open(WORKERS_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def allocate_workforce():
    forecasts = forecast_demand()
    workers = load_workers()

    allocation = []

    for forecast in forecasts:
        service = forecast["service"]
        predicted_demand = round(forecast["predicted_demand"])

        available_workers = [
            worker
            for worker in workers
            if worker["service"].lower() == service.lower()
            and worker.get("available", False)
        ]

        available_count = len(available_workers)

        required_workers = predicted_demand
        shortage = max(required_workers - available_count, 0)
        surplus = max(available_count - required_workers, 0)

        if shortage > 0:
            status = "SHORTAGE"
        elif surplus > 0:
            status = "SURPLUS"
        else:
            status = "BALANCED"

        allocation.append({
            "service": service,
            "predicted_demand": predicted_demand,
            "available_workers": available_count,
            "required_workers": required_workers,
            "shortage": shortage,
            "surplus": surplus,
            "status": status
        })

    return allocation


if __name__ == "__main__":
    results = allocate_workforce()

    print("\nWorkforce Allocation")
    print("--------------------")

    for result in results:
        print(
            f"{result['service']}: "
            f"Demand={result['predicted_demand']}, "
            f"Available={result['available_workers']}, "
            f"Status={result['status']}"
        )