const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const projectRoutes = require('./routes/projectRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Load environment variables and connect to the database
dotenv.config();
connectDB();

// Initialize Express app
const app = express();

// ** THE FIX IS HERE **
// Configure CORS to allow requests specifically from your frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN  // Update the port to match your frontend
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Simple test route for the root URL
app.get('/', (req, res) => {
  res.send('Pro-Tasker-V2 API is running...');
});

// Define the port from environment variables or default to 5001
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));