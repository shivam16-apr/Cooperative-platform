import json
from pathlib import Path
from collections import defaultdict
from statistics import mean


BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "demand_data.json"


def load_demand_data():
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def forecast_demand(service=None):
    data = load_demand_data()

    service_data = defaultdict(list)

    for record in data:
        if service is None or record["service"].lower() == service.lower():
            service_data[record["service"]].append(record["bookings"])

    forecasts = []

    for service_name, bookings in service_data.items():

        average_demand = mean(bookings)

        if len(bookings) >= 2:
            recent_demand = mean(bookings[-2:])
        else:
            recent_demand = average_demand

        # Give more importance to recent demand
        predicted_demand = (
            average_demand * 0.4
            + recent_demand * 0.6
        )

        if predicted_demand >= 10:
            demand_level = "HIGH"
        elif predicted_demand >= 6:
            demand_level = "MEDIUM"
        else:
            demand_level = "LOW"

        forecasts.append({
            "service": service_name,
            "average_demand": round(average_demand, 2),
            "recent_demand": round(recent_demand, 2),
            "predicted_demand": round(predicted_demand, 2),
            "demand_level": demand_level
        })

    forecasts.sort(
        key=lambda item: item["predicted_demand"],
        reverse=True
    )

    return forecasts


if __name__ == "__main__":
    results = forecast_demand()

    print("\nDemand Forecast")
    print("----------------")

    for result in results:
        print(
            f"{result['service']}: "
            f"{result['predicted_demand']} bookings "
            f"({result['demand_level']})"
        )