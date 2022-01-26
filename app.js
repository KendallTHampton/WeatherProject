const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res)
{
  res.sendFile(__dirname + "/index.html")

});






app.post("/", function (req, res)
{
  const query = req.body.cityName
  const apiKey = "3cdc16d575bb7a9d6628aa86c6219fd7"
  const unit = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  // HTTPS GET API INFORMATION

  https.get(url, function (response)
  {
    console.log(response.statusCode);

    response.on("data", function (data)
    {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdes = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";






      res.write("<p>The weather is currently  " + weatherdes + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
      res.write("<img src=" + imageURL + ">");



      res.send();
    });

  });

});

app.listen(3000, function ()
{
  console.log("server is running on port 3000");
});

