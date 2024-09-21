import getWeatherData from "../utils/httpreq.js";
import { removeModal, showModal } from "../utils/modal.js";

const WEEK_DAYS = [
  "Sunday",
  "monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const currentWeatherContainer = document.getElementById("current-weather");
const forecastContainer = document.getElementById("forecast");
const locationButton = document.getElementById("location-img");
const xButton = document.getElementById("x-button");

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    showModal("Please Enter A City Name!");
  }
  currentWeatherContainer.innerHTML = `<div id="loader"></div>`;
  const currentData = await getWeatherData("current", cityName);
  const forecastData = await getWeatherData("forecast", cityName);
  renderCurrentWeather(currentData);
  renderForecastData(forecastData);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    showModal("Your browser does not support this ability");
  }
};

const successFunction = async (position) => {
  currentWeatherContainer.innerHTML = `<div id="loader"></div>`;
  const currentData = await getWeatherData("current", position.coords);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderCurrentWeather(currentData);
  renderForecastData(forecastData);
};

const errorFunction = (error) => {
  showModal(error.message);
};

const renderCurrentWeather = (data) => {
  if (!data) return;
  const currentWeatherJSX = `
    <p id="head">${data.name} , ${data.sys.country}</p>
    <div id="main">
      <img alt="weather-icon" src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/>
      <p>${data.weather[0].main}
      <p>${data.main.temp}°C</p>
    </div>
    <div id="bottom">
      <p>Humidity: <span>${data.main.humidity}</span></p>
      <p>Wind Speed: <span>${data.wind.speed}</span>m/s</p>
    </div>
  `;
  currentWeatherContainer.innerHTML = currentWeatherJSX;
};

const gettingWeekDay = (dt) => {
  return WEEK_DAYS[new Date(dt * 1000).getDay()];
};

const renderForecastData = (data) => {
  if (!data) return;
  forecastContainer.innerHTML = "";
  data = data.list.filter((item) => item.dt_txt.endsWith("12:00:00"));
  data.forEach((item) => {
    const forecastJSX = `
    <div class=each-day>
        <img alt="forecast-icon" src="https://api.openweathermap.org/img/w/${
          item.weather[0].icon
        }.png" />
        <p class="week-day">${gettingWeekDay(item.dt)}</p>
        <p class="week-day-forecast">${item.main.temp}°C</p>
        <span class="week-day-forecast">${item.weather[0].main}</span>
    </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const inithandler = async () => {
  const currentData = await getWeatherData("current", "tehran");
  const forecastData = await getWeatherData("forecast", "tehran");
  renderCurrentWeather(currentData);
  renderForecastData(forecastData);
};

searchButton.addEventListener("click", searchHandler);
locationButton.addEventListener("click", locationHandler);
xButton.addEventListener("click", removeModal);
window.addEventListener("DOMContentLoaded", inithandler);
