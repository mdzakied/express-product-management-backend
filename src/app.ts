// src/app.ts
import express from 'express';
import connectDB from './config/database/connection';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB Express App!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
