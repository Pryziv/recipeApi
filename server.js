const express = require('express');
const app = express();
const http = require('http');
const logger = require('morgan');//request logger
const API_KEY = '7507bf288850d4c810eaaf7999d14176'
const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public'; //root directory for our static pages
let qstring = require('querystring')

//Middleware
app.use(function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('serving:' + __dirname + ROOT_DIR + req.path);
  next(); //allow next route or middleware to run
});
app.get('/', function(req, res){
  let query = qstring.parse(req.query); //GET method query parameters if any
  console.log(req.query.ingredient);
  if(req.query.ingredient != null ){
    var reqData = ''
    var JSONobj = '';
    req.on('data', function (chunk) {
      reqData += chunk
    })
    req.on('end', function() {
      JSONobj = getRecipes(req, res, function(){
        var jsonDataObj;
        req.apiData = ''
        req.on('data', function (chunk) {
          console.log("line1 "+req.apiData);
          req.apiData += chunk
        })
        req.on('end', function () {
          console.log(typeof req.apiData)
          console.log("line2 "+req.apiData);
          jsonData = JSON.parse(req.apiData);
          console.log("type: "+ typeof jsonDataObj);
          return req.apiData;
        })
      });

    })
    console.log("JSON " + JSONobj);
    res.send(JSONobj);
  }

})
app.use( logger('dev'));
app.use(express.static(__dirname + ROOT_DIR)); //provide static server

//Routes

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {console.log(`Server listening on port: ${PORT}`)}
})

function getRecipes(req, res, callback){

//You need to provide an appid with your request.
//Many API services now require that clients register for an app id.
var ingredient = req.query.ingredient;
  const options = {
     host: 'www.food2fork.com',
     path: `/api/search?q=${ingredient}&key=${API_KEY}`
  }
  http.request(options, function(apiResponse){
    console.log("running request");
    //parseData(apiResponse, res, function(){});
    callback(apiResponse);
  }).end();

}
/*function parseData(req, res, callback) {
  var jsonDataObj;
  req.apiData = ''
  req.on('data', function (chunk) {
    console.log("line1 "+req.apiData);
    req.apiData += chunk
  })
  req.on('end', function () {
    console.log(typeof req.apiData)
    console.log("line2 "+req.apiData);
    jsonData = JSON.parse(req.apiData);
    console.log("type: "+ typeof jsonDataObj);
    return req.apiData;
  })
callback();
}*/
