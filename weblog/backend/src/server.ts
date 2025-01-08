// Import the 'express' module
import express from 'express';
import { Pool } from 'pg';
import env from 'dotenv';

env.config();

// Create an Express application
const app = express();

// Set the port number for the server
const port = process.env.PORT;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err)
  } else {
    console.log('Successfully connected to Postgresql');
  }
})

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, Welcome to Aiyoub Reichert weblog');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});