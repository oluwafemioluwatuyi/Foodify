
const app = require('./src/app');

// Start the Express server
const port = process.env.PORT || 1433;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
