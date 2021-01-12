// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
const cors = require('cors');
const { PRIORITY_HIGH } = require('constants');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('Website'));

// Setup Server
const port = 3000;
const server = app.listen(port,listening);

function listening(){
    console.log('Running server');
    console.log(`Running on localhost:${port}`);
};

// GET route, returns projectData object to server code
app.get('/retrieve', getData);

function getData (req, res) {
    res.send(projectData);
};

//POST route, adds incoming data (x3)
app.post('/add', postData);

function postData (req, res) {
    projectData = req.body;
    res.send('POST received');
    console.log(projectData)
}
