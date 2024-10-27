const express = require('express');
const connectDB = require('./config/db'); // Make sure the path is correct

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Test Route
app.get('/test-db', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState; // Ensure mongoose is required
    if (isConnected) {
      res.status(200).send('Successfully connected to MongoDB');
    } else {
      res.status(500).send('Not connected to MongoDB');
    }
  } catch (error) {
    res.status(500).send('Error connecting to MongoDB');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
