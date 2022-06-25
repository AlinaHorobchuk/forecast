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
    let apiKey = "2840d517c80d8a73d6f0866480ac04a4";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
    axios.get(apiUrl).then(displayWeatherConditionFar);
}

function displayWeatherCondition(response) {
    console.log(response);
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );
    celsiusTemperature = response.data.main.temp;
    celsiusTemperatureNight = response.data.main.temp_min;
    let iconElement = document.querySelector("#weatherIcon");
    iconElement.setAttribute(
        "src",
        `/icons/${response.data.weather[0].icon}.svg`
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#night-temp").innerHTML = Math.round(
        response.data.main.temp_min
    );
    getForecast(response.data.coord);
}

function displayWeatherConditionFar(response) {
    console.log(response);
    document.querySelector("#current-city").innerHTML = response.data.name;
    celsiusTemperature = response.data.main.temp;
    celsiusTemperatureNight = response.data.main.temp_min;
    document.querySelector("#temperatureFar").innerHTML = Math.round(
        (celsiusTemperature * 9) / 5 + 32
    );
    let iconElement = document.querySelector("#weatherIcon");
    iconElement.setAttribute(
        "src",
        `/icons/${response.data.weather[0].icon}.svg`
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#nightTempFar").innerHTML = Math.round(
        (celsiusTemperatureNight * 9) / 5 + 32
    );
    getForecast(response.data.coord);
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
    getForecast(response.data.coord);
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = ``;
    forecast.forEach(function(forecastDay, index) {
        if (index < 5) {
            forecastHTML += `<div class="frst-day">
        <div class="next-day-name">${formatForecastDay(forecastDay.dt)}</div>
        <img class="next-icon" src="/icons/${
          forecastDay.weather[0].icon
        }.svg"></img>
        <div class="next-degrees-max">${Math.round(
          forecastDay.temp.max
        )} °C</div>
        <div class="next-degrees-min">${Math.round(
          forecastDay.temp.min
        )} °C</div>
    </div>`;
        }
    });
    forecastElement.innerHTML = forecastHTML;
}

function displayForecastFar(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecastFar");
    let forecastHTML = ``;
    forecast.forEach(function(forecastDay, index) {
        if (index < 5) {
            forecastHTML += `<div class="frst-day">
        <div class="next-day-name">${formatForecastDay(forecastDay.dt)}</div>
        <img class="next-icon" src="/icons/${
          forecastDay.weather[0].icon
        }.svg"></img>
        <div class="next-degrees-max">${Math.round(
          (forecastDay.temp.max * 9) / 5 + 32
        )} °C</div>
        <div class="next-degrees-min">${Math.round(
          (forecastDay.temp.min * 9) / 5 + 32
        )} °C</div>
    </div>`;
        }
    });
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "2840d517c80d8a73d6f0866480ac04a4";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
    axios.get(apiURL).then(displayForecastFar);
}

function formatForecastDay(timesTape) {
    let date = new Date(timesTape * 1000);
    let day = date.getDay();
    let daysForecast = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysForecast[day];
}

function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "2840d517c80d8a73d6f0866480ac04a4";
    let units = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(displayWeatherCondition);
    axios.get(apiUrl).then(displayWeatherConditionFar);
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
    celLink.classList.remove("inactive");
    farLink.classList.add("inactive");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFar(event) {
    event.preventDefault();
    celLink.classList.remove("active");
    farLink.classList.add("active");
    farLink.classList.remove("inactive");
    celLink.classList.add("inactive");
    let tempElement = document.querySelector("#temperature");
    let farTemp = (celsiusTemperature * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(farTemp);
}

function convertToCelNight(event) {
    event.preventDefault();
    farLinkNight.classList.remove("active");
    celLinkNight.classList.add("active");
    celLinkNight.classList.remove("inactive");
    farLinkNight.classList.add("inactive");
    let tempElement = document.querySelector("#night-temp");
    tempElement.innerHTML = Math.round(celsiusTemperatureNight);
}

function convertToFarNight(event) {
    event.preventDefault();
    celLinkNight.classList.remove("active");
    farLinkNight.classList.add("active");
    farLinkNight.classList.remove("inactive");
    celLinkNight.classList.add("inactive");
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