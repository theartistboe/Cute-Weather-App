function displayTemperature(response) {
    console.log(response.data);
    let tempElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind")
    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
}

let apiKey = "4b3503b2f08a729413c4d33ef1186004"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Merced&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);