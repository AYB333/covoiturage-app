import mongoose from "mongoose";

// Connect to MongoDB using the MONGO_URI environment variable
const connectDB = async () => {
  try {
    // Open the database connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    // Log the error and exit the process on failure
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
