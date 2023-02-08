var currentWeatherApiKey = '8b761f33816e95be99e5d105fa06bc99'

var searchForm = document.querySelector('#searchBtn');
var searchCity = document.querySelector("#inputCity");

let citySearch = function(event){
    event.preventDefault();
    let search=searchCity.value;
    if (search) {
        console.log(searchCity.value);
    }
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${currentWeatherApiKey}`)

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${currentWeatherApiKey}`
    )
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log((data));
        getWeather(data.coord.lat, data.coord.lon, data.name, data.weather);
    })
    .catch();
}

function getWeather(latitude, longitude, cityname, currentWeatherData) {
    console.log(latitude, longitude);

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${currentWeatherApiKey}`
    )
    .then(function(response) {
        return response.json();
    })
    .then(function (weatherForecast) {
        renderCurrentForecast(cityName, weatherForecast, currentWeatherData);
    });
}

function renderCurrentWeather(params) {
    // need to creat todays weather //
    // using a for loop to creat the desired results for 5 day forecast//
}


searchForm.addEventListener("click", citySearch)