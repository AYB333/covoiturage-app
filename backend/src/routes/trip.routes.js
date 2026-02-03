import express from "express";
import Trip from "../models/Trip.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Router for trip-related endpoints
const router = express.Router();

// Get all trips (driver populated with name and email)
router.get("/", async (req, res) => {
  const trips = await Trip.find().populate("driver", "name email");
  return res.json(trips);
});

// Create a new trip (protected)
router.post("/", authMiddleware, async (req, res) => {
  // Read trip data from request body
  const { from, to, date, price, seats } = req.body;

  // Build the trip with the authenticated user as driver
  const trip = new Trip({
    driver: req.user.id,
    from,
    to,
    date,
    price,
    seats
  });

  // Save and return the created trip
  await trip.save();

  return res.status(201).json(trip);
});

export default router;
