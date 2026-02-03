import mongoose from "mongoose";

// Define the favorite schema
const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  createdAt: { type: Date, default: Date.now }
});

// Create the Favorite model
const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
