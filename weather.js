const axios = require("axios");
const apiKey = "9f3d04327d2714f90779faa7428fbb46";

console.log(`Weather API Key = ${apiKey}`);
const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=Tramore,Ireland&appid=${apiKey}`;

async function getWeather() {
  let weather = {};
  const response = await axios.get(weatherRequest);
  if (response.status == 200) {
    weather = response.data;
  }

  const report = {
    feelsLike: Math.round(weather.main.feels_like - 273.15),
    clouds: weather.weather[0].description,
    windSpeed: weather.wind.speed,
    windDirection: weather.wind.deg,
    visibility: weather.visibility / 1000,
    humidity: weather.main.humidity,
  };
  console.log(report);
}

getWeather();
