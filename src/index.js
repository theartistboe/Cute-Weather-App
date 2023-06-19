function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) { 
    forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png" alt="">
        <br />
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°F</span> | <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°C</span>
      </div>
    `;
        }
      })
    forecastElement.innerHTML = forecastHTML;
  }
  
function getForecast(coordinates) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let tempElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind")
    let datetimeElement = document.querySelector("#datetime")
    let iconElement = document.querySelector("#icon")

    celsiusTemperature = response.data.main.temp;
    
    tempElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    datetimeElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconCode = response.data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    iconElement.setAttribute("src", iconUrl);

    getForecast(response.data.coord);
  }

function search(city) {
    let apiKey = "4b3503b2f08a729413c4d33ef1186004";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temp")
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(fahrenheitTemperature);
  }

let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  search("Merced");

  function changeTheme() {
    let body = document.querySelector("body");
    let overlayImage = document.getElementById("overlay-image");
    let themeButton = document.getElementById("darkThemeToggle");

    body.classList.toggle("dark");
    themeButton.checked = body.classList.contains("dark");

    if (body.classList.contains("dark")) {
      overlayImage.src = "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/086/391/original/Weather_App_Cat.png?1687208115"
    } else {
      overlayImage.src = "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/086/389/original/Weather_App_Cat_2.png?1687208043"
    }
  }
  
    document.addEventListener("DOMContentLoaded", function() {
    let themeButton = document.getElementById("darkThemeToggle");
    themeButton.addEventListener("change", changeTheme);

      });