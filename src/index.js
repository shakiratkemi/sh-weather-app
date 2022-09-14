function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let timeHours = now.getHours();
  let timeMinutes = now.getMinutes();
  timeHours = timeHours < 10 ? `0` + timeHours : timeHours;
  timeMinutes = timeMinutes < 10 ? `0` + timeMinutes : timeMinutes;
  return `${day},${date} ${timeHours}:${timeMinutes}`;
}
let now = new Date();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(now);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "e1a1e984ddfbd4c270b900f1212c4a45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayPosition(position) {
  let apiKey = "e1a1e984ddfbd4c270b900f1212c4a45";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentLocation);
searchCity("Nigeria");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showTempFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "69.8";
}
let fahrenheit = document.querySelector("#fahrenheit-unit");
fahrenheit.addEventListener("click", showTempFahrenheit);

function showTempCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "21";
}
let celsius = document.querySelector("#celsius-unit");
celsius.addEventListener("click", showTempCelsius);
