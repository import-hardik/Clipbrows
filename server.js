// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint that logs the received data
app.post('/hello', (req, res) => {
  console.log('Received POST data:', req.body);
  res.json({"status":"received"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

