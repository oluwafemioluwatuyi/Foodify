
const express = require('express');
const app = express();

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Server is running!');
});


module.exports = app;
