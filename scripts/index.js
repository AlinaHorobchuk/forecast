function formatTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let currentTime = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
    return currentTime;
}
document.getElementById("timeNow").innerHTML = formatTime();

function formatDate() {
    let now = new Date();
    let month = now.getMonth();
    let date = now.getDate();
    let currentDate =
        ("0" + date).slice(-2) + "." + ("0" + (month + 1)).slice(-2);
    return currentDate;
}
document.getElementById("dateNow").innerHTML = formatDate();

function formatDay() {
    let now = new Date();
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
    return day;
}
document.getElementById("current-day").innerHTML = formatDay();

function searchCity(city) {
    let apiKey = "b60bafe697efece646b5e2470f53aa39";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
    console.log(response);
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector("#precipitation").innerHTML =
        response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#night-temp").innerHTML = Math.round(
        response.data.main.temp_min
    );
}

function inputCity(event) {
    event.preventDefault();
    let city = document.querySelector("#enterCity").value;
    searchCity(city);
}
let cityForm = document.querySelector("#city-input");
cityForm.addEventListener("submit", inputCity);

function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let currentCityTemp = document.querySelector("#temperature");
    currentCityTemp.innerHTML = `${temperature}`;
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#precipitation").innerHTML =
        response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#night-temp").innerHTML = Math.round(
        response.data.main.temp_min
    );
}

function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "b60bafe697efece646b5e2470f53aa39";
    let units = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

function getCurrentLoc(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocButton = document.querySelector("#current-button");
currentLocButton.addEventListener("click", getCurrentLoc);

searchCity("New York");

function convertToF(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
}

function convertBackToCel(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
}
let farLink = document.querySelector("#far-link");
farLink.addEventListener("click", convertToF);
let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", convertBackToCel);