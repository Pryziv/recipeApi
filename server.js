/*
NOTE: THIS CODE WILL NOT RUN UNTIL YOU ENTER YOUR OWN openweathermap.org APP ID KEY

NOTE: You need to intall the npm modules by executing >npm install
before running this server

Simple express server re-serving data from openweathermap.org
To test:
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/
const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = process.env.PORT || 3000

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
  THE KEY BELOW IS FAKE
*/
const WEATHER_API_KEY = '35ed2be6a95755bb299b43550aecbe6a'; //PUT IN YOUR OWN KEY HERE
const RECIPE_API_KEY = '7507bf288850d4c810eaaf7999d14176';
const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/weather', (request, response) => {
  let city = request.query.city
  console.log(request.query);
  if(!city) {
    return response.json({message: 'Please enter a city name'})
  }
  console.log("Accessing API");
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))
  })
})

app.get('/recipe', (request, response) => {
  let ingredient = request.query.ingredient;
  console.log("Query "+request.query);
  if(!ingredient){
    return response.json({message: 'Please enter a ingredient name'});
  }
  console.log('Accessing API');
  const url = `http://www.food2fork.com/api/search?q=${ingredient}&key=${RECIPE_API_KEY}`;
  requestModule.get(url, (err, res, data) => {
    dataObj = JSON.parse(data);
    var count = dataObj.count;
    var htmlString = '<html><h1><center>Search Results for '+ingredient+'</h1><body>'
    for(var i=0; i<count; i++){
    htmlString = htmlString +
    `<h><center><b><a href=${dataObj.recipes[i].source_url} target="_blank">Recipe title ${dataObj.recipes[i].title}</a><b></h>
    <h><center>Publisher ${dataObj.recipes[i].publisher}</h><br>
    <img src=${dataObj.recipes[i].image_url} style= width:400px;height:400px;>
          <ul>
          </ul>`
        }
    htmlString+='</body></html>'
    if(ingredient != null){
      return response.send(htmlString);
    }else{
    return response.contentType('application/json').json(JSON.parse(data));
  }
  })
})
//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
  }
})
