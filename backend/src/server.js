import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import runCodeRouter from './routes/runCode.js';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// API route for running code
app.use('/visualizer', runCodeRouter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

