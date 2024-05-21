const express = require('express');
const ApiController = require('./controllers/apiController');

const app = express();
const port = 3050;


// Routes
app.get('/api', ApiController.router);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api`);
});