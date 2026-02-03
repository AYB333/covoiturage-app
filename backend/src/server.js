import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB before starting the server
connectDB();

// Server port
const PORT = 5000;

// Start the HTTP server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});