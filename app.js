// jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extend : true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="00ed08df85e9876ba22f241e6ffcc7a3"
  const url="https:api.openweathermap.org/data/2.5/weather?q=" + query +"&units=metric&appid="+apiKey;
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
  const weatherData=JSON.parse(data);
  const temp=weatherData.main.temp ;
  const weatherDescription=weatherData.weather[0].description;
  const iconId=weatherData.weather[0].icon ;
  const imgURL="http://openweathermap.org/img/wn/"+iconId+"@2x.png" ;

  res.write("<p> Weather currently is " + weatherDescription + "<p>");
  res.write("<h1> The temperature in "+query +" is "+ temp+ " degree Celcius.</h1>");
  res.write("<img src= "+ imgURL + " > ");
  res.send();

  });
  });
});

app.listen(3000,function(){
  console.log("We are at port 3000");
});
