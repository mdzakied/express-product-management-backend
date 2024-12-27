import express, { Request, Response } from "express";

import dotenv from "dotenv";
import connectDB from "./config/database/connection";

import authRoute from "./routes/authRoute";
import productRoute from "./routes/productRoute";

import { initializeAdminAccount } from "./init/initializeAdminAccount";

// Initialize express
const app = express();
const cors = require("cors");

// Connect to MongoDB
connectDB();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

// Allow cross-origin requests from your frontend (adjust the URL)
app.use(cors({
  origin: process.env.CLIENT_URL, // Your app's URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// All routes are now prefixed with /api
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

// Catch-all route for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});


// Start the server
const startServer = async () => {
  try {
    // Initialize admin account
    await initializeAdminAccount(); // Ensure admin account is initialized

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
