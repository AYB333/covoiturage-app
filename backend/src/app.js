import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

// Create the Express app instance
const app = express();

// Parse JSON bodies
app.use(express.json());
// Enable CORS
app.use(cors());

// Auth routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/api/test", (req, res) => {
  res.json({ message: "API works" });
});

export default app;
