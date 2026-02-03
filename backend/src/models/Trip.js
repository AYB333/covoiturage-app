import mongoose from "mongoose";

// Define the trip schema
const tripSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the Trip model
const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
