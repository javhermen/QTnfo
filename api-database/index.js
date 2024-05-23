const express = require('express');
const bodyParser = require('body-parser');
const ApiController = require('./controllers/apiController');

const app = express();
const port = 3050;


app.use(bodyParser.json())


// Routes
/*
app.get('/api', ApiController.router);
app.get('/api/:table', ApiController.router);
app.get('/api/:table/id/:id', ApiController.router);

app.post('/api/:table', ApiController.router);
*/

app.all('/api', ApiController.router);
app.all('/api/:table', ApiController.router);
app.all('/api/:table/id/:id', ApiController.router);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api`);
});