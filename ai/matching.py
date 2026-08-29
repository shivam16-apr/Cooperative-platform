import json
import math


# Load worker data
with open("workers.json", "r") as file:
    workers = json.load(file)


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two locations.
    Returns distance in kilometres.
    """

    R = 6371

    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def match_workers(
    customer_lat,
    customer_lon,
    required_service,
    max_distance=10
):
    """
    Find and rank workers for a customer.
    """

    matches = []

    for worker in workers:

        # Check service
        if worker["service"].lower() != required_service.lower():
            continue

        # Check availability
        if not worker["available"]:
            continue

        # Calculate distance
        distance = calculate_distance(
            customer_lat,
            customer_lon,
            worker["latitude"],
            worker["longitude"]
        )

        # Ignore workers outside maximum distance
        if distance > max_distance:
            continue

        # Distance score
        distance_score = max(
            0,
            100 - (distance / max_distance * 100)
        )

        # Rating score
        rating_score = (worker["rating"] / 5) * 100

        # Experience score
        experience_score = min(
            worker["experience"] / 10 * 100,
            100
        )

        # Final score
        final_score = (
            distance_score * 0.5
            + rating_score * 0.3
            + experience_score * 0.2
        )

        matches.append({
            "id": worker["id"],
            "name": worker["name"],
            "service": worker["service"],
            "distance_km": round(distance, 2),
            "rating": worker["rating"],
            "experience": worker["experience"],
            "match_score": round(final_score, 2)
        })

    # Highest score first
    matches.sort(
        key=lambda worker: worker["match_score"],
        reverse=True
    )

    return matches


# --------------------------------
# TEST
# --------------------------------

customer_lat = 28.6130
customer_lon = 77.2080

results = match_workers(
    customer_lat,
    customer_lon,
    "carpenter"
)


print("\nBEST MATCHING WORKERS\n")

for worker in results:
    print(
        f'{worker["name"]} | '
        f'{worker["distance_km"]} km | '
        f'Rating: {worker["rating"]} | '
        f'Match Score: {worker["match_score"]}%'
    )