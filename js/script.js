const apiKey = "fcf4b4eef8ecb304a60e72ba1f6b1630";

const locationElement = document.querySelector(".location");
const temperatureElement = document.querySelector(".temperature");
const descriptionElement = document.querySelector(".description");

function displayWeather(weatherData) {
  const { name, main, weather } = weatherData;
  locationElement.textContent = name;
  temperatureElement.textContent = `${Math.round(main.temp)}°C`;
  descriptionElement.textContent = weather[0].description;
}

function fetchWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.error("Error fetching weather data:", error));
}

function handleGeoLocationSuccess(position) {
  const { latitude, longitude } = position.coords;
  fetchWeatherData(latitude, longitude);
}

function handleGeoLocationError(error) {
  console.error("Error detecting location:", error);
  locationElement.textContent = "Unable to detect location";
}

function detectLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      handleGeoLocationSuccess,
      handleGeoLocationError
    );
  } else {
    locationElement.textContent = "Geolocation not supported";
  }
}

detectLocation();
