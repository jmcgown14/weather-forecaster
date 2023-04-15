var currentWeatherApiKey = "8b761f33816e95be99e5d105fa06bc99";
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
    const arrayFromStorage = JSON.parse(
      localStorage.getItem("weatherSearchHistory")
    );
    arrayFromStorage.push(searchItem.value);
    localStorage.setItem(
      "weatherSearchHistory",
      JSON.stringify(arrayFromStorage)
    );
  } else if (!localStorage.getItem("weatherSearchHistory")) {
    localStorage.setItem(
      "weatherSearchHistory",
      JSON.stringify([searchItem.value])
    );
  }
  populateHistory();
  weatherData(searchItem.value);
  currentWeatherEl.style.display = "block";
});

var buttonContainer = document.querySelector("#button-container");
populateHistory();
function populateHistory() {
  const arrayFromStorage = JSON.parse(
    localStorage.getItem("weatherSearchHistory")
  );

  if (arrayFromStorage) {
    //
    buttonContainer.innerHTML = "";
    for (var i = 0; i < arrayFromStorage.length; i++) {
      const button = document.createElement("button");
      button.innerText = arrayFromStorage[i];
      button.addEventListener("click", (e) => {
        weatherData(e.target.textContent);
      });
      buttonContainer.append(button);
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
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${currentWeatherApiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastWeather) {
      renderCurrentWeather(cityName, currentWeatherData);
      renderForecastWeather(forecastWeather);
    });
}

function renderCurrentWeather(cityName, currentWeatherData) {
  var todayDate = dayjs().format("MM/DD/YYYY");
  console.log("current: ", currentWeatherData);

  // Programatically display that data to the page
  currentWeatherEl.innerHTML = `
        <h3>${currentWeatherData.name}</h3>
                <div>
                    <h4>${todayDate}</h4>
                </div>
                <p>Temperature: ${currentWeatherData.main.temp} °F</p>
                <p>Wind Speed: ${currentWeatherData.wind.speed} MPH</p>
                <p>Humidity: ${currentWeatherData.main.humidity}%</p>
    `;
}
// Create function for forecastWeather
const forecastDiv = document.getElementById("forecast");
function renderForecastWeather(forecastWeather) {
  //empty forecast div
  forecastDiv.innerHTML = "";
  for (let i = 5; i < forecastWeather.list.length; i += 8) {
    const card = document.createElement("div");
    console.log(forecastWeather.list[i]);
    card.innerHTML = ` <h3>${forecastWeather.list[i].dt_txt}</h3>
               <p>Temperature: ${forecastWeather.list[i].main.temp} °F</p>
              <p>Wind Speed: ${forecastWeather.list[i].wind.speed} MPH</p>
             <p>Humidity: ${forecastWeather.list[i].main.humidity}%</p>`;

    forecastDiv.append(card);
  }
}
