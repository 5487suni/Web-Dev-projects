const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "05f3412236104809abe608dd351a796e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.setHeader("Content-Type", "text/html")
            res.write("<h3>The weather is currently " + desc + ".</h3>");
            res.write("<h3>The temperature in " + query + " is: " + temp + " Degree Celcius.</h3>");
            res.write("<img src = "+iconUrl+">");
            res.send();
               //we cannot have two send() in a get() 
               //therefore use multiple res.write()
        })
    })
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})
