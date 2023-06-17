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

function displayTemperature(response) {
    console.log(response.data);
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
  }

function search(city) {
    let apiKey = "4b3503b2f08a729413c4d33ef1186004";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temp")
    tempElement.innerHTML = Math.round(celsiusTemperature);
  }

let celsiusTemperature = null;
let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

  search("Merced");

  function changeTheme() {
    let body = document.querySelector("body");
    body.classList.toggle("dark");
  }
  
  let themeButton = document.querySelector(".form-check-input");
  themeButton.addEventListener("click", changeTheme);
  updateDateTime();
  