// server.js

import express from 'express';
import cors from 'cors';
import { fetchGtfsData } from './fetchGtfsData.js'; // Import the named export

const app = express();

// Use CORS middleware with options to allow requests from your frontend
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend URL
    methods: 'GET,POST', // Define allowed methods
  })
);

// Route to handle GTFS data fetch
app.get('/api/gtfs', async (req, res) => {
  try {
    // Fetch the GTFS data
    const gtfsData = await fetchGtfsData();
    // Send the fetched data as a JSON response
    res.json(gtfsData);
  } catch (error) {
    console.error('Error fetching GTFS data:', error);
    res.status(500).json({ error: 'Error fetching GTFS data' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
