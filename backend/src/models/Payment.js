import mongoose from "mongoose";

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"] },
  stripeSessionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create the Payment model
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
