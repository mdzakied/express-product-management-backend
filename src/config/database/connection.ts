import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB without the deprecated options
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("MongoDB connected to db_product_management");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure if connection fails
  }

  // Listen to connection events
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error:", error);
  });
};

export default connectDB;
