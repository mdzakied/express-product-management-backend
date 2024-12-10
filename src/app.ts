import express, { Request, Response } from "express";
import dotenv from 'dotenv';

import connectDB from "./config/database/connection";

import authRoute from "./routes/authRoute";

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Load environment variables
dotenv.config();  

// Middleware
app.use(express.json());

// All routes are now prefixed with /api
app.use("/api/auth", authRoute);

// Catch-all route for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: 'Route not found' });
});


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
