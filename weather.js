const express = require('express')
const https= require("https");
const bodyParser= require("body-parser");
const app = express()

app.use( bodyParser.urlencoded({ extended: true }));

const port = 3000

app.get('/', function(req, res){

  res.sendFile(__dirname+"/weather.html");

})
app.post('/', function(req, res){
  console.log(req.body.cityname);

  const key= 'a1283fd3866b245c49fd67b6d99896c6';
  const city= req.body.cityname;
  const url= 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+key;
  https.get(url, (response) => {
  console.log(response);
  console.log(response.statusCode);


  response.on('data',function(data) {
    //const weatherdata=JSON.parse(data);
    console.log(data);
    const weatherdata= JSON.parse(data);
    console.log(weatherdata);
    const temp = weatherdata.main.temp;
    console.log(temp)
    const weatherdesc= weatherdata.weather[0].description;

    const icon=weatherdata.weather[0].icon;
    const picurl= "http:openweathermap.org/img/wn/"+ icon +"@2x.png";

    res.write("<p> The weather is currently : "+ weatherdesc+"</p>");
    res.write("<h1>The temperature of "+weatherdata.name+" is "+temp+"</h1>");
    res.write("<img src = " +picurl+ ">");
    res.send();

 });
})





})
app.listen(port, () => {
  console.log("Server is running on Port-300");
})
