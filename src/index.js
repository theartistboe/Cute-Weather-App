function displayTemperature(response) {
    console.log(response.data.main.temp);
    let tempElement = document.querySelector("#temp");
    let statusElement = document.querySelector("#status");
    tempElement.innerHTML = Math.round(response.data.main.temp);
    statusElement.innerHTML = response.data.name;
}

let apiKey = "4b3503b2f08a729413c4d33ef1186004"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Merced&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);