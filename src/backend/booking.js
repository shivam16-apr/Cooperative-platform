const express = require("express");
const prisma = require("./prisma");
const {
    authenticateToken,
    authorizeRoles
} = require("./middleware");

const router = express.Router();


// =====================================================
// CREATE BOOKING — CUSTOMER ONLY
// =====================================================

router.post(
    "/",
    authenticateToken,
    authorizeRoles("CUSTOMER"),
    async (req, res) => {
        try {
            const {
                workerId,
                serviceId,
                bookingDate
            } = req.body;

            // Customer ID comes from JWT
            const customerId = req.user.id;

            if (!workerId || !serviceId || !bookingDate) {
                return res.status(400).json({
                    message: "workerId, serviceId and bookingDate are required"
                });
            }

            // Check worker exists
            const worker = await prisma.workerProfile.findUnique({
                where: {
                    id: workerId
                }
            });

            if (!worker) {
                return res.status(404).json({
                    message: "Worker not found"
                });
            }

            // Check worker availability
            if (!worker.isAvailable) {
                return res.status(400).json({
                    message: "Worker is currently unavailable"
                });
            }

            // Check service exists
            const service = await prisma.service.findUnique({
                where: {
                    id: serviceId
                }
            });

            if (!service) {
                return res.status(404).json({
                    message: "Service not found"
                });
            }

            // Create booking
            const booking = await prisma.booking.create({
                data: {
                    customerId,
                    workerId,
                    serviceId,
                    bookingDate: new Date(bookingDate)
                },
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
                    service: true
                }
            });

            res.status(201).json({
                message: "Booking created successfully",
                booking
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Failed to create booking"
            });
        }
    }
);


// =====================================================
// GET ALL BOOKINGS
// =====================================================

router.get(
    "/",
    authenticateToken,
    async (req, res) => {
        try {

            let bookings;

            // CUSTOMER → only their bookings
            if (req.user.role === "CUSTOMER") {

                bookings = await prisma.booking.findMany({
                    where: {
                        customerId: req.user.id
                    },
                    include: {
                        worker: {
                            include: {
                                user: {
                                    select: {
                                        name: true,
                                        phone: true
                                    }
                                }
                            }
                        },
                        service: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                });

            }

            // WORKER → only their bookings
            else if (req.user.role === "WORKER") {

                bookings = await prisma.booking.findMany({
                    where: {
                        worker: {
                            userId: req.user.id
                        }
                    },
                    include: {
                        customer: {
                            select: {
                                id: true,
                                name: true,
                                phone: true
                            }
                        },
                        service: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                });

            }

            // ADMIN → all bookings
            else if (req.user.role === "ADMIN") {

                bookings = await prisma.booking.findMany({
                    include: {
                        customer: {
                            select: {
                                id: true,
                                name: true,
                                phone: true
                            }
                        },
                        worker: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        phone: true
                                    }
                                }
                            }
                        },
                        service: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                });

            }

            else {
                return res.status(403).json({
                    message: "Access denied"
                });
            }

            res.json(bookings);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Failed to fetch bookings"
            });
        }
    }
);


// =====================================================
// GET BOOKING BY ID
// =====================================================

router.get(
    "/:id",
    authenticateToken,
    async (req, res) => {
        try {

            const booking = await prisma.booking.findUnique({
                where: {
                    id: req.params.id
                },
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
                    service: true,
                    review: true
                }
            });

            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            // Check access
            const isCustomer =
                booking.customerId === req.user.id;

            const isWorker =
                booking.worker.userId === req.user.id;

            const isAdmin =
                req.user.role === "ADMIN";

            if (!isCustomer && !isWorker && !isAdmin) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }

            res.json(booking);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Failed to fetch booking"
            });
        }
    }
);


// =====================================================
// UPDATE BOOKING STATUS
// =====================================================

router.patch(
    "/:id/status",
    authenticateToken,
    async (req, res) => {

        try {

            const { status } = req.body;

            const allowedStatuses = [
                "ACCEPTED",
                "REJECTED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED"
            ];

            if (!status || !allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid booking status"
                });
            }

            const booking = await prisma.booking.findUnique({
                where: {
                    id: req.params.id
                },
                include: {
                    worker: true
                }
            });

            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            const isCustomer =
                booking.customerId === req.user.id;

            const isWorker =
                booking.worker.userId === req.user.id;

            const isAdmin =
                req.user.role === "ADMIN";


            // -----------------------------------------
            // CUSTOMER CAN ONLY CANCEL
            // -----------------------------------------

            if (isCustomer && status !== "CANCELLED") {
                return res.status(403).json({
                    message: "Customer can only cancel a booking"
                });
            }


            // -----------------------------------------
            // WORKER CAN ACCEPT / REJECT / START /
            // COMPLETE
            // -----------------------------------------

            if (
                isWorker &&
                ![
                    "ACCEPTED",
                    "REJECTED",
                    "IN_PROGRESS",
                    "COMPLETED"
                ].includes(status)
            ) {
                return res.status(403).json({
                    message: "Worker cannot perform this action"
                });
            }


            // -----------------------------------------
            // ADMIN CAN CHANGE ANY STATUS
            // -----------------------------------------

            if (!isCustomer && !isWorker && !isAdmin) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }


            // -----------------------------------------
            // UPDATE
            // -----------------------------------------

            const updatedBooking =
                await prisma.booking.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        status
                    }
                });

            res.json({
                message: "Booking status updated",
                booking: updatedBooking
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Failed to update booking status"
            });
        }
    }
);


module.exports = router;