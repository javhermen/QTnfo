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

/*
docker exec -it qtnfo-mongodb-1 bash
mongosh "mongodb://Quote:etouQ@localhost/QTnfo?authSource=admin"
*/

// Routes
/*
app.get('/api', ApiController.router);
app.get('/api/:table', ApiController.router);
app.get('/api/:table/id/:id', ApiController.router);

app.post('/api/:table', ApiController.router);
*/

/*
app.get('/api', ApiController.router);
app.get('/api/:table', ApiController.router);

app.post('/api/:table', ApiController.router);

app.post('/api/refill', ApiController.refill);
*/

app.get('/api', ApiController.help);

app.get('/api/QTnotebooks', ApiController.getAllNotebooks);
app.get('/api/QTnotebooks/populated', ApiController.getAllnotebooksPopulated);
app.get('/api/:QTnotebook/QTpages', ApiController.getNotebookPages);
app.get('/api/:QTnotebook/:QTpage', ApiController.getNotebookPage);

// app.get('/api/:QTnotebook/:QTpage', ApiController.getPageBoxes);


app.get('/api/reset', ApiController.reset);
// app.get('/api/refill', ApiController.refill);
// app.get('/api/unfill', ApiController.unfill);
// app.get('/api/all/notebooks/names', ApiController.notebooks);

/*
app.all('/api', ApiController.router);
app.all('/api/:table', ApiController.router);
app.all('/api/:table/id/:id', ApiController.router);
*/

/*
app.get('/api', ApiController.router);
app.get('/api/user/:user/:pass', ApiController.router);
app.get('/api/pages', ApiController.router);
app.get('/api/pages/count', ApiController.router);
app.get('/api/page/:id', ApiController.router);
*/

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api`);
});