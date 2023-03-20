var currentWeatherApiKey = '8b761f33816e95be99e5d105fa06bc99'
var searchForm = document.querySelector(".inputGroup");
var searchItem = document.querySelector("#searchItem");
var currentWeatherEl = document.querySelector(".current");

// Event Listener
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(searchItem.value);

  if (
    localStorage.getItem("weatherSearchHistory") &&
    !localStorage.getItem("weatherSearchHistory").includes(searchItem.value)
  ) {
    const arrayFromStorage = JSON.parse(localStorage.getItem("weatherSearchHistory"));
    arrayFromStorage.push(searchItem.value);
    localStorage.setItem("weatherSearchHistory", JSON.stringify(arrayFromStorage));
  } else if (!localStorage.getItem("weatherSearchHistory")) {
    localStorage.setItem("weatherSearchHistory", JSON.stringify([searchItem.value]));
  }
populateHistory();
  weatherData(searchItem.value);
  currentWeatherEl.style.display= "block"
});

var buttonContainer = document.querySelector('#button-container')
populateHistory();
function populateHistory(){
  const arrayFromStorage = JSON.parse(localStorage.getItem("weatherSearchHistory"));

if (arrayFromStorage){
  // 
  buttonContainer.innerHTML=''
  for (var i = 0; i < arrayFromStorage.length; i++){
    const button = document.createElement('button')
    button.innerText = arrayFromStorage[i]
    button.addEventListener('click', (e)=>{
      weatherData(e.target.textContent)
    })
    buttonContainer.append(button)
  }
}
}

function weatherData(searchTerm) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${currentWeatherApiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("FIRST RESPONSE", data);
      getWeather(data.coord.lat, data.coord.lon, data.name, data);
    })
    .catch();
}

function getWeather(latitude, longitude, cityName, currentWeatherData) {
  console.log(latitude, longitude);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=$${currentWeatherApiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastWeather) {
      renderCurrentWeather(cityName, forecastWeather, currentWeatherData);
    });
}

function renderCurrentWeather(cityName, forecastWeather, currentWeatherData) {
  var todayDate = dayjs().format("MM/DD/YYYY");
  console.log("current: ", currentWeatherData);

  console.log("forecast: ", forecastWeather.list);
  var tempKtoF = Math.floor(
    (currentWeatherData.main.temp - 273.15) * (9 / 5) + 32
  );
  // Programatically display that data to the page
  currentWeatherEl.innerHTML = `
        <h3>${cityName}</h3>
                <div>
                    <h4>${todayDate}</h4>
                </div>
                <p>Temperature: ${tempKtoF} °F</p>
                <p>Wind Speed: ${currentWeatherData.wind.speed} MPH</p>
                <p>Humidity: ${currentWeatherData.main.humidity}%</p>
    `;

  renderForecastWeather(forecastWeather);
}
// Create function for forecastWeather
function renderForecastWeather(forecastWeather) {
  var elements = document.getElementsByClassName("card");
  // for Loop for the forecast
  for (var i = 0; i < elements.length; i++) {
    x = i * 8;
    let date = dayjs()
      .add(i + 1, "day")
      .format("MM/DD/YYYY");

    // Programatically display that data to the page
    elements[i].innerHTML = `
              <h3>${date}</h3>
              <p>Temperature: ${forecastWeather.list[x].main.temp} °F</p>
              <p>Wind Speed: ${forecastWeather.list[x].wind.speed} MPH</p>
              <p>Humidity: ${forecastWeather.list[x].main.humidity}%</p>
              `;
  }
}