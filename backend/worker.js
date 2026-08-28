const express = require("express");
const prisma = require("./prisma");

const router = express.Router();

// CREATE WORKER PROFILE
router.post("/", async (req, res) => {
    try {
        const { userId, skills, experience, location } = req.body;

        if (!userId || !skills) {
            return res.status(400).json({
                message: "userId and skills are required"
            });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if profile already exists
        const existingProfile = await prisma.workerProfile.findUnique({
            where: { userId }
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "Worker profile already exists"
            });
        }

        const worker = await prisma.workerProfile.create({
            data: {
                userId,
                skills,
                experience: experience ? Number(experience) : null,
                location
            }
        });

        res.status(201).json({
            message: "Worker profile created successfully",
            worker
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create worker profile"
        });
    }
});


// GET ALL WORKERS
router.get("/", async (req, res) => {
    try {
        const workers = await prisma.workerProfile.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                }
            }
        });

        res.json(workers);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch workers"
        });
    }
});


// GET WORKER BY ID
router.get("/:id", async (req, res) => {
    try {
        const worker = await prisma.workerProfile.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                }
            }
        });

        if (!worker) {
            return res.status(404).json({
                message: "Worker not found"
            });
        }

        res.json(worker);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch worker"
        });
    }
});


// UPDATE AVAILABILITY
router.patch("/:id/availability", async (req, res) => {
    try {
        const { isAvailable } = req.body;

        const worker = await prisma.workerProfile.update({
            where: {
                id: req.params.id
            },
            data: {
                isAvailable
            }
        });

        res.json({
            message: "Availability updated",
            worker
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update availability"
        });
    }
});


module.exports = router;