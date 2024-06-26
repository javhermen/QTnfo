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

app.get('/', ApiController.help);
app.get('/api', ApiController.help);


app.get('/api/QTnotebooks/validateTitle/:title', ApiController.validateQTnotebookTitle);

app.get('/api/QTnotebooks', ApiController.getAllNotebooks);
app.get('/api/QTnotebooks/populated', ApiController.getAllnotebooksPopulated);
app.get('/api/:QTnotebook/QTpages', ApiController.getNotebookPages);
app.get('/api/:QTnotebook/:QTpage', ApiController.getNotebookPage);
app.get('/api/QTfavorites', ApiController.getAllQTfavorite);

app.put('/api/QTbox/:QTboxID', ApiController.putQTbox);
app.put('/api/QTnote/:QTnoteID', ApiController.putQTnote);
app.put('/api/QTnotebook/:QTnotebookID', ApiController.putQTnotebook);
app.put('/api/QTpage/:QTnotebookID/:QTpageID', ApiController.putQTpage);
app.put('/api/QTfavorite', ApiController.putQTfavorite);

app.post('/api/QTnotebook', ApiController.postQTnotebook);
app.post('/api/:QTnotebookID/QTpage', ApiController.postQTpage);
app.post('/api/:QTpageID/QTbox', ApiController.postQTbox);
app.post('/api/:QTboxID/QTnote', ApiController.postQTnote);

app.delete('/api/:QTnotebookID', ApiController.deleteQTnotebook);
app.delete('/api/:QTnotebookID/QTpage/:QTpageID', ApiController.deleteQTpage);
app.delete('/api/:QTpageID/QTbox/:QTboxID', ApiController.deleteQTbox);
app.delete('/api/:QTboxID/QTnote/:QTnoteID', ApiController.deleteQTnote);


app.get('/api/reset', ApiController.reset);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api`);
});