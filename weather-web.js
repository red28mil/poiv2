//I have tried to get this to work from here followed all instruction but i couldnt get fetch to work,
// so my api key is in my HTML page and open to the public.

const axios = require("axios");
const apiKey = "9f3d04327d2714f90779faa7428fbb46";

async function readWeather(location) {
  let weather = null;
  const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  try {
    const response = await axios.get(weatherRequest);
    if (response.status == 200) {
      weather = response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return weather;
}

function renderCell(row, col, value) {
  const cell = row.insertCell(col);
  cell.innerHTML = value;
}

async function renderWeather(report) {
  const table = document.getElementById("weather-table");
  const row = table.insertRow(-1);
  renderCell(row, 0, report.feelsLike);
  renderCell(row, 1, report.clouds);
  renderCell(row, 2, report.windSpeed);
  renderCell(row, 3, report.windDirection);
  renderCell(row, 4, report.visibility);
  renderCell(row, 5, report.humidity);
}

async function fetchWeather() {
  let result = "Success";
  const location = document.getElementById("location-id").value;
  let weather = await readWeather(location);
  if (weather != null) {
    const report = {
      feelsLike: Math.round(weather.main.feels_like - 273.15),
      clouds: weather.weather[0].description,
      windSpeed: weather.wind.speed,
      windDirection: weather.wind.deg,
      visibility: weather.visibility / 1000,
      humidity: weather.main.humidity,
    };
    renderWeather(report);
  } else {
    result = "Unknown Location";
  }
  resultElement = document.getElementById("result-msg");
  resultElement.textContent = result;
}
