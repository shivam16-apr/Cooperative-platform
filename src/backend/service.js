const express = require("express");
const prisma = require("./prisma");

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
    try {
        const services = await prisma.service.findMany();

        res.json(services);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch services"
        });
    }
});


// CREATE a service
router.post("/", async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                message: "Name and price are required"
            });
        }

        const service = await prisma.service.create({
            data: {
                name,
                description,
                price: Number(price)
            }
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create service"
        });
    }
});

module.exports = router;