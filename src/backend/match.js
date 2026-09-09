const express = require("express");

const router = express.Router();

// POST /api/match-workers
router.post("/", async (req, res) => {
    try {
        const {
            service,
            latitude,
            longitude,
            max_distance
        } = req.body;

        // Validate required fields
        if (
            !service ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "service, latitude and longitude are required"
            });
        }

        // Call Python AI Matching API
        const response = await fetch("http://127.0.0.1:8000/match", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                service,
                latitude: Number(latitude),
                longitude: Number(longitude),
                max_distance: max_distance !== undefined
                    ? Number(max_distance)
                    : 10
            })
        });

        // Check AI API response
        if (!response.ok) {
            return res.status(502).json({
                message: "AI matching service failed"
            });
        }

        const data = await response.json();

        // Send AI results to frontend
        res.json(data);

    } catch (error) {
        console.error("AI Matching Error:", error);

        res.status(500).json({
            message: "Failed to get worker recommendations"
        });
    }
});

module.exports = router;