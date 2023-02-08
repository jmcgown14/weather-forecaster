var currentWeatherApiKey = "8b761f33816e95be99e5d105fa06bc99"

var searchForm = document.querySelector(".citySearch");
var searchCity = document.querySelector("#inputCity");

let citySearch = function(event){
    event.preventDefault();
    let search=searchCity.value;
    if (search) {
        console.log(searchCity.value);
    }

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${currentWeatherApiKey}'
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
        'https://api.openweathermap.org/data/2.5/weather?lat=$(latitude)&lon=$(longitude)&appid=$(currentWeatherApiKey)'
    )
}

searchForm.addEventListener("click", citySearch)