const express = require('express');
const bodyParser = require('body-parser');
const ApiController = require('./controllers/apiController');
const cors = require('cors')

const app = express();
const port = 3050;


app.use(cors())
app.use(bodyParser.json());


const mongoose = require('mongoose');
mongoose.connect('mongodb://Quote:etouQ@mongodb:27017/QTnfo?authSource=admin');


// Routes
/*
app.get('/api', ApiController.router);
app.get('/api/:table', ApiController.router);
app.get('/api/:table/id/:id', ApiController.router);

app.post('/api/:table', ApiController.router);
*/

app.get('/api', ApiController.router);
app.get('/api/:table', ApiController.router);

app.post('/api/:table', ApiController.router);

app.post('/api/refill', ApiController.refill);

/*
app.all('/api', ApiController.router);
app.all('/api/:table', ApiController.router);
app.all('/api/:table/id/:id', ApiController.router);
*/

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api`);
});