const serviceRoutes = require("./service");
const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");
const authRoutes = require("./auth");
const workerRoutes = require("./worker");
const bookingRoutes = require("./booking");
const reviewRoutes = require("./review");
const matchRoutes = require("./match");
const { authenticateToken } = require("./middleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/match-workers", matchRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Cooperative Platform Backend is running!"
    });
});

app.get("/api/health", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            status: "OK",
            message: "Backend and database are connected"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "ERROR",
            message: "Database connection failed"
        });
    }
});

const PORT = 5000;
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "You accessed a protected route!",
        user: req.user
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});