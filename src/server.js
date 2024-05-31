const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Use CORS and BodyParser middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend origin to access
  methods: ['POST', 'GET', 'OPTIONS'], // Allowed methods
  credentials: true // Allow credentials
}));
app.use(bodyParser.json());

// Dummy search endpoint
app.post('/search', (req, res) => {
  const query = req.body.query;
  console.log('Received query:', query);

  // Dummy response similar to what your frontend expects
  const matches = [
    { id: '1', score: 0.9 },
    { id: '2', score: 0.85 },
    { id: '3', score: 0.8 }
  ];

  res.json({ matches });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
