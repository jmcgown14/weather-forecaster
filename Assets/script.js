var currentWeatherApiKey = "4147dec85cccdda8f40665aca82055da"

var searchForm = document.querySelector(".citySearch")
var searchCity = document.querySelector("#inputCity")

let citySearch = function(event){
    event.preventDefault();
    let search=searchCity.value;
    if (search) {
        console.log(searchCity.value);
    }
}
searchForm.addEventListener("click", citySearch)