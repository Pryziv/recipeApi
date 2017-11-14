/*
Example of a "static server implemented with the express framework.

PREREQUISITES:
install express module using the package.json file with command:
>npm install

TO TEST:
Use browser to view pages at http://localhost:3000/index.html.
*/
const express = require('express');
const app = express();
const qstring = require('querystring');
const logger = require('morgan');
const API_KEY = '7507bf288850d4c810eaaf7999d14176'
const router = express.Router();

const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public'; //root directory for our static pages

//Middleware
app.use( logger('dev'));
app.use(function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('serving:' + __dirname + ROOT_DIR + req.path);
  next(); //allow next route or middleware to run
});

app.get('/', function(req, res){
//can access the get written in as an object through the req.query
  console.log(req.query);
  console.log(typeof req.query);
  res.send("sucssess");
})
app.use(express.static(__dirname + ROOT_DIR)); //provide static server

//Routes

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {console.log(`Server listening on port: ${PORT}`)}
})
