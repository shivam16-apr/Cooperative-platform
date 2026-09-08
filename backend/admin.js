const axios = require("axios");
const express = require("express");
const prisma = require("./prisma");
const {
    authenticateToken,
    authorizeRoles
} = require("./middleware");

const router = express.Router();


// ==========================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// ==========================================

router.get(
    "/dashboard",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {

            const [
                totalWorkers,
                totalCustomers,
                totalBookings,
                completedBookings,
                pendingBookings,
                totalReviews,
                totalServices,
                availableWorkers
            ] = await Promise.all([

                prisma.user.count({
                    where: {
                        role: "WORKER"
                    }
                }),

                prisma.user.count({
                    where: {
                        role: "CUSTOMER"
                    }
                }),

                prisma.booking.count(),

                prisma.booking.count({
                    where: {
                        status: "COMPLETED"
                    }
                }),

                prisma.booking.count({
                    where: {
                        status: "PENDING"
                    }
                }),

                prisma.review.count(),

                prisma.service.count(),

                prisma.workerProfile.count({
                    where: {
                        isAvailable: true
                    }
                })
            ]);


            res.json({
                totalWorkers,
                totalCustomers,
                totalBookings,
                completedBookings,
                pendingBookings,
                totalReviews,
                totalServices,
                availableWorkers
            });

        } catch (error) {

            console.error("Admin dashboard error:", error);

            res.status(500).json({
                message: "Failed to load admin dashboard"
            });
        }
    }
);

// ==========================================
// GET ALL WORKERS FOR ADMIN
// GET /api/admin/workers
// ==========================================

router.get(
    "/workers",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
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

            const formattedWorkers = workers.map((worker) => ({
                id: worker.id,
                name: worker.user.name,
                email: worker.user.email,
                phone: worker.user.phone,
                role: worker.skills,
                experience: worker.experience,
                location: worker.location,
                rating: worker.rating,
                status: worker.isAvailable ? "Active" : "Offline"
            }));

            res.json(formattedWorkers);

        } catch (error) {
            console.error("Admin workers error:", error);

            res.status(500).json({
                message: "Failed to fetch workers"
            });
        }
    }
);
// ==========================================
// GET ALL CUSTOMERS FOR ADMIN
// GET /api/admin/customers
// ==========================================

router.get(
    "/customers",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {
            const customers = await prisma.user.findMany({
                where: {
                    role: "CUSTOMER"
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    createdAt: true
                }
            });

            res.json(customers);

        } catch (error) {
            console.error("Admin customers error:", error);

            res.status(500).json({
                message: "Failed to fetch customers"
            });
        }
    }
);
// ==========================================
// GET ALL BOOKINGS FOR ADMIN
// GET /api/admin/bookings
// ==========================================

router.get(
    "/bookings",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {
            const bookings = await prisma.booking.findMany({
                include: {
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true
                        }
                    },
                    worker: {
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
                    },
                    service: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json(bookings);

        } catch (error) {
            console.error("Admin bookings error:", error);

            res.status(500).json({
                message: "Failed to fetch bookings"
            });
        }
    }
);
// ==========================================
// GET ALL REVIEWS FOR ADMIN
// GET /api/admin/reviews
// ==========================================

router.get(
    "/reviews",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {
            const reviews = await prisma.review.findMany({
                include: {
                    customer: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    booking: {
                        include: {
                            worker: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            },
                            service: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            res.json(reviews);

        } catch (error) {
            console.error("Admin reviews error:", error);

            res.status(500).json({
                message: "Failed to fetch reviews"
            });
        }
    }
);
// ==========================================
// DEMAND FORECAST
// GET /api/admin/demand-forecast
// ==========================================

router.get(
    "/demand-forecast",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {
            const service = req.query.service;

            let url = "http://127.0.0.1:8000/forecast";

            if (service) {
                url += `?service=${encodeURIComponent(service)}`;
            }

            const response = await axios.get(url);

            res.json(response.data);

        } catch (error) {
            console.error("Admin demand forecast error:", error);

            res.status(500).json({
                message: "Failed to fetch demand forecast"
            });
        }
    }
);
// ==========================================
// WORKFORCE ALLOCATION
// GET /api/admin/workforce-allocation
// ==========================================

router.get(
    "/workforce-allocation",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/allocate"
            );

            res.json(response.data);

        } catch (error) {
            console.error(
                "Admin workforce allocation error:",
                error
            );

            res.status(500).json({
                message: "Failed to fetch workforce allocation"
            });
        }
    }
);
// ==========================================
// ADMIN WELFARE OVERVIEW
// GET /api/admin/welfare
// ==========================================

router.get(
    "/welfare",
    authenticateToken,
    authorizeRoles("ADMIN"),
    async (req, res) => {
        try {
            const [
                totalWorkers,
                availableWorkers,
                unavailableWorkers,
                workersWithProfiles
            ] = await Promise.all([
                prisma.user.count({
                    where: {
                        role: "WORKER"
                    }
                }),

                prisma.workerProfile.count({
                    where: {
                        isAvailable: true
                    }
                }),

                prisma.workerProfile.count({
                    where: {
                        isAvailable: false
                    }
                }),

                prisma.workerProfile.count()
            ]);

            res.json({
                totalWorkers,
                workersWithProfiles,
                availableWorkers,
                unavailableWorkers
            });

        } catch (error) {
            console.error("Admin welfare error:", error);

            res.status(500).json({
                message: "Failed to load welfare information"
            });
        }
    }
);
module.exports = router;
