// Import necessary modules
import express from "express";   // Importing Express web framework
import fetch from "node-fetch";  // Importing node-fetch for making HTTP requests
import dotenv from 'dotenv';     // Importing dotenv to load environment variables from a .env file
import cors from "cors";         // Importing CORS for handling Cross-Origin Resource Sharing

dotenv.config();  // Load environment variables from .env file

const app = express();  // Create an instance of Express
const port = 5000;      // Define the port number
const apiKey = process.env.API_KEY;  // Get API key from environment variables

app.use(cors());  // Use CORS middleware to enable Cross-Origin Resource Sharing

// Define a route for handling GET requests to /search endpoint
app.get('/search', async (req, res) => {
  const { movie } = req.query;  // Extract the 'movie' query parameter from the request
  const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=true&language=en-US&page=1&api_key=${apiKey}`;

  try {
    // Fetch movie data from external API
    const response = await fetch(url);  // Send HTTP GET request to movie search endpoint
    const data = await response.json(); // Parse the JSON response from the API

    // If no results found, return 404 error
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Get the ID of the first movie from the search results
    const movieId = data.results[0].id;
    // Construct URL to fetch similar movies based on the movie ID
    const urlId = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1&api_key=${apiKey}`;
    // Fetch similar movies data from external API
    const responseSimilar = await fetch(urlId);  // Send HTTP GET request to fetch similar movies
    const similarMovies = await responseSimilar.json();  // Parse the JSON response

    // Prepare the response object with main movie details and similar movies
    const result = {
      movie: data.results[0],               // Main movie details from the search results
      similarMovies: similarMovies.results, // List of similar movies
    };

    res.json(result);  // Send JSON response with the result object

  } catch (error) {
    console.error('error:', error);  // Log any errors to the console
    res.status(500).send('Internal Server Error');  // Send 500 Internal Server Error for any exceptions
  }
});

// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  // Log a message when the server starts successfully
});