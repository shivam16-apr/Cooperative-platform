const express = require("express");
const prisma = require("./prisma");

const router = express.Router();

// CREATE REVIEW
router.post("/", async (req, res) => {
    try {
        const { bookingId, customerId, rating, comment } = req.body;

        // Check required fields
        if (!bookingId || !customerId || !rating) {
            return res.status(400).json({
                message: "bookingId, customerId and rating are required"
            });
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        // Find booking
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Only completed bookings can be reviewed
        if (booking.status !== "COMPLETED") {
            return res.status(400).json({
                message: "You can review only completed bookings"
            });
        }

        // Check customer
        if (booking.customerId !== customerId) {
            return res.status(403).json({
                message: "You can only review your own booking"
            });
        }

        // Check if review already exists
        const existingReview = await prisma.review.findUnique({
            where: { bookingId }
        });

        if (existingReview) {
            return res.status(400).json({
                message: "This booking has already been reviewed"
            });
        }

        // Create review
        const review = await prisma.review.create({
            data: {
                bookingId,
                customerId,
                rating: Number(rating),
                comment
            }
        });

        // Update worker rating
        const workerId = booking.workerId;

        const reviews = await prisma.review.findMany({
            where: {
                booking: {
                    workerId
                }
            }
        });

        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        const averageRating = totalRating / reviews.length;

        await prisma.workerProfile.update({
            where: { id: workerId },
            data: {
                rating: averageRating
            }
        });

        res.status(201).json({
            message: "Review added successfully",
            review,
            workerRating: averageRating
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create review"
        });
    }
});


// GET REVIEWS FOR A WORKER
router.get("/worker/:workerId", async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                booking: {
                    workerId: req.params.workerId
                }
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(reviews);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch reviews"
        });
    }
});


module.exports = router;