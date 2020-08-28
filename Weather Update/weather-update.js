
var submit = document.querySelector("form");
var loadingText = document.querySelector("h3")
var windDirection = document.querySelector(".wind-direction")
submit.addEventListener("submit",function(event){
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(function (position) {
        loadingText.style.display = 'block'
        console.log(position);
        var x = position.coords;
        // var location = [];
        // location.push(x);
        var longitutde = position.coords.longitude;
        var laitutde = position.coords.latitude;
        var y = position.timestamp;
        var dateString = new Date(y);
    

        console.log(x);
        console.log(longitutde);
        console.log(laitutde);
        console.log(dateString)
        API_KEY = '5c0933754dfe4712de552026ce664ed3'

        var baseURL = `https://api.openweathermap.org/data/2.5/weather`

        baseURL += `?lat=${laitutde}&lon=${longitutde}&units=metric&appid=${API_KEY}`

        fetch(baseURL).then(function (response) {
            return response.json();
        }).then(function (responseData) {
            console.log(responseData)
            loadingText.style.display = 'none'
            var displayDate = document.querySelector(".display-date");
            var p = document.createElement("p");
            p.textContent = dateString;
            displayDate.insertAdjacentElement("afterbegin", p);

            var location1 = responseData.coord.lon;
            var location2 = responseData.coord.lat;
            var country = responseData.sys.country;
            var city = responseData.name;
            var sunrise = Number(responseData.sys.sunrise);
            var sunset = Number(responseData.sys.sunset);
            var localTimeSunrise = new Date(sunrise).toISOString();
            var localTimeSunset = new Date(sunset).toISOString();
            var windSpeed = responseData.wind.speed;
            var windDeg = responseData.wind.deg;
            var minTemp = responseData.main.temp_min;
            var maxTemp = responseData.main.temp_max;
            var pressure = responseData.main.pressure
            var humidity = responseData.main.humidity
            var sky = responseData.weather[0].description
            console.log(localTimeSunrise)
            console.log(localTimeSunset)
           
            var displayLocation = document.querySelector(".display-location");
            var A = document.createElement("p");
            A.textContent = `Longitude & Latitude Of current location : Lon "${location1}", Lat "${location2}" ,
            Country : ${country}, City : ${city}.`;
            displayLocation.insertAdjacentElement("afterbegin", A);

            var B = document.createElement("p");
            B.textContent = `Time of Sunrise : ${localTimeSunrise} and Time of Sunset : ${localTimeSunset}  (ISO time),
            Description : ${sky}. `
            displayLocation.insertAdjacentElement("beforeend", B);

            var displayWeather = document.querySelector(".weather-update");
            var C = document.createElement("p")
            var D = document.createElement("p")
            C.textContent = `Minimum Temp. of the day : ${minTemp} deg C and Maximum Temp. of the day : ${maxTemp} deg C`;
            D.textContent = `Air Pressure : ${pressure} hPa, Humidity : ${humidity}%, Wind Speed : ${windSpeed} m/s, 
            From ${windDeg}deg.`;
            displayWeather.insertAdjacentElement("beforeend", C,);
            displayWeather.insertAdjacentElement("beforeend", D);
            windDirection.style.display = "block";
            
        }).catch(function (error) {
            console.log(error)
        })

    }, function (error) {
        console.log(error)
    })

})

    
