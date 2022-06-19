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
    celsiusTemperature = response.data.main.temp;
    celsiusTemperatureNight = response.data.main.temp_min;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
    let iconElement = document.querySelector("#weatherIcon");
    iconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    let currentCityTemp = document.querySelector("#temperature");
    let iconElement = document.querySelector("#weatherIcon");
    celsiusTemperature = response.data.main.temp;
    celsiusTemperatureNight = response.data.main.temp_min;
    currentCityTemp.innerHTML = `${temperature}`;
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#night-temp").innerHTML = Math.round(
        response.data.main.temp_min
    );
    iconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

function firstButtonCityWeather(event) {
    event.preventDefault();
    searchCity("kyiv");
}
let firstButtonCity = document.querySelector("#cityNameFirst");
firstButtonCity.addEventListener("click", firstButtonCityWeather);

function secondButtonCityWeather(event) {
    event.preventDefault();
    searchCity("zaporizhzhia");
}
let secondButtonCity = document.querySelector("#cityNameSecond");
secondButtonCity.addEventListener("click", secondButtonCityWeather);

function thirdButtonCityWeather(event) {
    event.preventDefault();
    searchCity("london");
}
let thirdButtonCity = document.querySelector("#cityNameThird");
thirdButtonCity.addEventListener("click", thirdButtonCityWeather);

function fourthButtonCityWeather(event) {
    event.preventDefault();
    searchCity("paris");
}
let fourthButtonCity = document.querySelector("#cityNameFourth");
fourthButtonCity.addEventListener("click", fourthButtonCityWeather);

searchCity("New York");

function convertToCel(event) {
    event.preventDefault();
    farLink.classList.remove("active");
    celLink.classList.add("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFar(event) {
    event.preventDefault();
    celLink.classList.remove("active");
    farLink.classList.add("active");
    let tempElement = document.querySelector("#temperature");
    let farTemp = (celsiusTemperature * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(farTemp);
}

function convertToCelNight(event) {
    event.preventDefault();
    farLinkNight.classList.remove("active");
    celLinkNight.classList.add("active");
    let tempElement = document.querySelector("#night-temp");
    tempElement.innerHTML = Math.round(celsiusTemperatureNight);
}

function convertToFarNight(event) {
    event.preventDefault();
    celLinkNight.classList.remove("active");
    farLinkNight.classList.add("active");
    let tempElement = document.querySelector("#night-temp");
    let farTemp = (celsiusTemperatureNight * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(farTemp);
}
let celsiusTemperatureNight = null;
let celsiusTemperature = null;
let celLink = document.querySelector("#celLink");
celLink.addEventListener("click", convertToCel);
let farLink = document.querySelector("#farLink");
farLink.addEventListener("click", convertToFar);
let celLinkNight = document.querySelector("#celLinkNight");
celLinkNight.addEventListener("click", convertToCelNight);
let farLinkNight = document.querySelector("#farLinkNight");
farLinkNight.addEventListener("click", convertToFarNight);